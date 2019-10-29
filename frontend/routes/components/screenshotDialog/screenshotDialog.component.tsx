/**
 *  Copyright (C) 2017 3D Repo Ltd
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as React from 'react';
import EventListener from 'react-event-listener';
import { Layer } from 'react-konva';

import { renderWhenTrue } from '../../../helpers/rendering';
import { Drawing } from './components/drawing/drawing.component';
import { DrawnLine } from './components/drawnLine/drawnLine.component';
import { EditableText } from './components/editableText/editableText.component';
import { Erasing } from './components/erasing/erasing.component';
import { Indicator } from './components/indicator/indicator.component';
import { Shape } from './components/shape/shape.component';
import { SHAPE_TYPES } from './components/shape/shape.constants';
import { TextNode } from './components/textNode/textNode.component';
import { Tools } from './components/tools/tools.component';
import {
	getNewDrawnLine, getNewShape, getNewText, getTextStyles, EDITABLE_TEXTAREA_NAME, ELEMENT_TYPES, INITIAL_VALUES, MODES
} from './screenshotDialog.helpers';
import { Container, Stage } from './screenshotDialog.styles';

declare const Konva;

interface IProps {
	sourceImage: string | Promise<string>;
	disabled?: boolean;
	canvasElements: any[];
	arePastElements: boolean;
	areFutureElements: boolean;
	viewer: any;
	handleResolve: (screenshot) => void;
	handleClose: () => void;
	addElement: (element) => void;
	updateElement: (elementName, property) => void;
	removeElement: (elementName) => void;
	undo: () => void;
	redo: () => void;
	clearHistory: () => void;
	initHistory: () => void;
}
export class ScreenshotDialog extends React.PureComponent<IProps, any> {
	public state = {
		color: INITIAL_VALUES.color,
		brushSize: INITIAL_VALUES.brushSize,
		brushColor: INITIAL_VALUES.color,
		textSize: INITIAL_VALUES.textSize,
		mode: null,
		activeShape: null,
		sourceImage: '',
		stage: {
			height: 0,
			width: 0
		},
		selectedObjectName: '',
		textEditable: {
			visible: false,
			value: '',
			styles: {},
			elementName: ''
		} as any
	};

	public containerRef = React.createRef<any>();
	public layerRef = React.createRef<any>();
	public imageLayerRef = React.createRef<any>();
	public drawingLayerRef = React.createRef<any>();
	public stageRef = React.createRef<any>();

	public lastImageCanvasWidth = null;

	public get containerElement() {
		return this.containerRef.current;
	}

	public get layer() {
		return this.layerRef.current;
	}

	public get imageLayer() {
		return this.imageLayerRef.current;
	}

	public get drawingLayer() {
		return this.drawingLayerRef.current;
	}

	public get stage() {
		return this.stageRef.current;
	}

	public get isDrawingMode() {
		return this.state.mode === MODES.BRUSH || this.state.mode === MODES.ERASER;
	}

	public get isErasing() {
		return this.state.mode === MODES.ERASER;
	}

	public get selectedElementType() {
		const [elementType] = this.state.selectedObjectName.split('-');
		return elementType;
	}

	public renderEditableTextarea = renderWhenTrue(() => (
		<EditableText
			value={this.state.textEditable.value}
			styles={this.getEditableTextareaStyles()}
			handleTextEdit={this.handleTextEdit}
			handleTextareaKeyDown={this.handleTextareaKeyDown}
		/>
	));

	public renderIndicator = renderWhenTrue(() => (
		<Indicator color={this.state.color} size={this.state.brushSize} />
	));

	public renderErasing = renderWhenTrue(() => {
		return (
			<Erasing
				height={this.state.stage.height}
				width={this.state.stage.width}
				size={this.state.brushSize}
				color={this.state.brushColor}
				mode={this.state.mode}
				layer={this.layerRef}
				stage={this.stage}
			/>
		);
	});

	public setStageSize = () => {
		const height = this.containerElement.offsetHeight;
		const width = this.containerElement.offsetWidth;
		const stage = { height, width };
		this.setState({ stage });
	}

	public async componentDidMount() {
		const sourceImage = await Promise.resolve(this.props.sourceImage);

		Konva.Image.fromURL(sourceImage, (image) => {
			this.scaleStage(image);

			this.imageLayer.add(image);
			this.imageLayer.batchDraw();
			this.lastImageCanvasWidth = this.imageLayer.canvas.width;
		});

		this.setState({ sourceImage, mode: INITIAL_VALUES.mode }, () => {
			this.setStageSize();
			this.stage.addEventListener('click', this.handleStageClick);
		});

		document.addEventListener('keydown', this.handleKeyDown);
		this.props.viewer.pauseRendering();
		this.clearCanvas();
	}

	public componentDidUpdate(prevProps, prevState) {
		if (this.state.mode === MODES.SHAPE && prevState.mode !== MODES.SHAPE) {
			document.body.style.cursor = 'crosshair';
		}
	}

	public componentWillUnmount() {
		this.props.viewer.resumeRendering();
		document.removeEventListener('keydown', this.handleKeyDown);
		this.clearCanvas();
	}

	public handleStageClick = () => {
		if (this.state.mode === MODES.TEXT && !this.state.selectedObjectName && !this.state.textEditable.visible) {
			const position = this.stage.getPointerPosition();
			this.addNewText(position);
		}
	}

	public handleResize = () => {
		this.setStageSize();
		const backgroundImage = this.imageLayer.children[0];
		this.scaleStage(backgroundImage);
	}

	public scaleStage = (image) => {
		const imageX = (this.stage.attrs.width - image.attrs.image.naturalWidth) / 2;

		image.setAttrs({
			height: this.stage.attrs.height,
			x: imageX,
			y: 0
		});

		if (this.lastImageCanvasWidth) {
			const x = (this.imageLayer.canvas.width - this.lastImageCanvasWidth) / 2;

			this.layer.setAttrs({ x });
			this.drawingLayer.setAttrs({ x });
		} else {
			this.lastImageCanvasWidth = this.imageLayer.canvas.width;
		}
	}

	public handleBrushSizeChange = (event) => {
		const newState = {} as any;
		newState.brushSize = event.target.value;

		if (this.state.selectedObjectName) {
			const size = event.target.value;
			const changedProperties = {} as any;

			if (this.selectedElementType === ELEMENT_TYPES.TEXT) {
				changedProperties.fontSize = size;
			} else {
				changedProperties.strokeWidth = size;
			}
			this.props.updateElement(this.state.selectedObjectName, changedProperties);
		}

		this.setState(newState);
	}

	public handleColorChange = (color) => {
		const newState = {} as any;
		newState.color = color;
		newState.brushColor = color;

		if (this.state.selectedObjectName) {
			const changedProperties = {} as any;

			if (this.selectedElementType === ELEMENT_TYPES.DRAWING) {
				changedProperties.stroke = color;
			}
			changedProperties.color = color;
			this.props.updateElement(this.state.selectedObjectName, changedProperties);
		}
		this.setState(newState);
	}

	public clearCanvas = () => {
		this.layer.clear();
		this.drawingLayer.clear();
		this.stage.clearCache();
		this.layer.clearCache();
		this.drawingLayer.clearCache();
		this.layer.destroyChildren();
		this.drawingLayer.destroyChildren();

		// init before clear - it's on puporse because of library's bug;
		// the library doesn't clear current state, only past and future
		this.props.initHistory();
		this.props.clearHistory();
	}

	public handleClose = () => {
		this.props.handleClose();
	}

	public handleSave = async () => {
		const screenshot = await this.stage.toDataURL();
		this.props.handleResolve(screenshot);
	}

	public setMode = (mode) => {
		const newState = {
			mode: this.state.mode === mode ? '' : mode
		} as any;

		if (this.state.selectedObjectName) {
			newState.selectedObjectName = '';
		}
		this.setState(() => newState);
	}

	public setBrushMode = () => this.setMode(MODES.BRUSH);

	public setEraserMode = () => {
		this.setMode(MODES.ERASER);
	}

	public setShapeMode = (shape) => {
		const newState = {
			activeShape: shape
		} as any;

		if (this.state.mode !== MODES.SHAPE) {
			newState.mode = MODES.SHAPE;
		}

		this.setState(newState);
	}

	public handleOnEdit = (target) => {
		const styles = getTextStyles(target);
		const visible = true;
		const value = target.attrs.text;
		const name = this.state.selectedObjectName;
		this.setState({
			textEditable: { visible, value, styles, name }
		}, () => {
			setTimeout(() => {
				window.addEventListener('click', this.handleOutsideClick);
			});
		});
	}

	public handleOutsideClick = (e) => {
		if (e.target.name !== EDITABLE_TEXTAREA_NAME) {
			const newState = {} as any;
			newState.textEditable = {
				...this.state.textEditable,
				visible: false,
				name: ''
			};

			if (this.state.textEditable.name && this.props.canvasElements.length) {
				const text = this.state.textEditable.value;
				this.props.updateElement(this.state.textEditable.name, { text });
			}

			this.setState(newState, () => {
				setTimeout(() => {
					window.removeEventListener('click', this.handleOutsideClick);
				});
			});
		}
	}

	public handleTextEdit = ({target: {value}}) => {
		const [textAreaWidth] = this.state.textEditable.styles.width.split('px');
		const width = Number(textAreaWidth);

		this.setState({
			textEditable: {
				...this.state.textEditable,
				value,
				styles: {
					...this.state.textEditable.styles,
					width: `${width + (this.state.textEditable.styles.fontSize * 0.7)}px`
				}
			}
		});
	}

	public handleTextareaKeyDown = (e) => {
		if (e.keyCode === 13) {
			const newState = {} as any;
			newState.textEditable = {
				...this.state.textEditable,
				visible: false,
				name: false
			};

			if (this.state.textEditable.name && this.props.canvasElements.length) {
				const text = this.state.textEditable.value;
				this.props.updateElement(this.state.textEditable.name, { text });
			}

			this.setState(newState);
		}
	}

	public handleToolTextClick = () => {
		if (this.state.mode !==  MODES.TEXT) {
			this.setState({ mode: MODES.TEXT }, () => {
				document.body.style.cursor = 'crosshair';
			});
		} else {
			this.setState({ mode: '' }, () => {
				document.body.style.cursor = 'default';
			});
		}
	}

	public addNewText = (position) => {
		const newText = getNewText(this.state.color, this.state.textSize, position);
		const selectedObjectName = newText.name;
		this.props.addElement(newText);
		this.setState({ selectedObjectName, mode: MODES.TEXT });
		document.body.style.cursor = 'crosshair';
	}

	public addNewDrawnLine = (line) => {
		if (!this.state.selectedObjectName) {
			const newLine = getNewDrawnLine(line.attrs, this.state.color);
			const selectedObjectName = this.isErasing ? '' : newLine.name;
			this.props.addElement(newLine);
			this.setState(({ mode }) => ({ selectedObjectName, mode: this.isErasing ? mode : MODES.BRUSH }));
		}
	}

	public addNewShape = (figure, { attrs }) => {
		if (!this.state.selectedObjectName) {
			const correctCircle = figure === SHAPE_TYPES.CIRCLE && attrs.radius > 1;
			const correctTriangle = figure === SHAPE_TYPES.TRIANGLE && attrs.radius > 1;
			const correctRectangle =
				figure === SHAPE_TYPES.RECTANGLE && (Math.abs(attrs.height) > 1 || Math.abs(attrs.width) > 1);
			const correctLineShape = [SHAPE_TYPES.LINE, SHAPE_TYPES.ARROW]
					.includes(figure) && attrs.points && attrs.points.length;
			const correctCustomShape = [SHAPE_TYPES.CLOUD, SHAPE_TYPES.CLOUDLINE]
					.includes(figure) && (Math.abs(attrs.scaleX) > 0 || Math.abs(attrs.scaleY) > 0);

			if (correctCircle || correctTriangle || correctRectangle || correctLineShape || correctCustomShape) {
				const newShape = getNewShape(figure, this.state.color, attrs);
				const selectedObjectName = newShape.name;
				this.props.addElement(newShape);
				this.setState({ selectedObjectName });
			}

			document.body.style.cursor = 'crosshair';
		}
	}

	public handleSelectObject = (object) => {
		const newState = {
			selectedObjectName: object.name,
			brushColor: object.color || object.stroke,
			color: object.color || object.stroke,
			mode: object.type
		} as any;

		if (object.fontSize) {
			newState.brushSize = object.fontSize;
		}
		this.setState(newState);
	}

	public handleChangeObject = (attrs) => {
		this.props.updateElement(attrs.name, attrs);
	}

	public handleKeyDown = (e) => {
		if (this.state.selectedObjectName && !this.state.textEditable.visible) {
			if (e.keyCode === 8) {
				this.props.removeElement(this.state.selectedObjectName);
				this.setState({
					selectedObjectName: ''
				}, () => {
					document.body.style.cursor = 'default';
				});
			}
		}
	}

	public renderObjects = () => this.props.canvasElements.map((element, index) => {
		const isTextEditing = this.state.textEditable.name === element.name;
		const isSelected = this.state.selectedObjectName === element.name;
		const commonProps = {
			element,
			isSelected,
			isVisible: element.type === ELEMENT_TYPES.TEXT ? !isTextEditing : true,
			handleChange: (newAttrs) => this.handleChangeObject(newAttrs)
		};

		if (element.type === ELEMENT_TYPES.TEXT) {
			return (<TextNode	key={index} {...commonProps} onEdit={this.handleOnEdit} />);
		} else if (element.type === ELEMENT_TYPES.DRAWING) {
			return(<DrawnLine key={index} {...commonProps} />);
		}
		return (<Shape key={index} {...commonProps} isDrawingMode={this.isDrawingMode} />);
	})

	public renderDrawing = () => {
		return (
			<Drawing
				height={this.state.stage.height}
				width={this.state.stage.width}
				size={this.state.brushSize}
				color={this.state.brushColor}
				mode={this.state.mode}
				layer={this.drawingLayerRef}
				stage={this.stage}
				handleNewDrawnLine={this.addNewDrawnLine}
				handleNewDrawnShape={this.addNewShape}
				selected={this.state.selectedObjectName}
				activeShape={this.state.activeShape}
				disabled={this.props.disabled}
			/>
		);
	}

	public renderLayers = () => {
		if (this.state.stage.width && this.state.stage.height) {
			return (
				<>
					<Layer ref={this.imageLayerRef} />
					<Layer ref={this.layerRef}>
						{this.renderObjects()}
						{this.renderErasing(this.isErasing)}
					</Layer>
					<Layer ref={this.drawingLayerRef}>
						{this.renderDrawing()}
					</Layer>
				</>
			);
		}
	}

	public renderTools = () => (
		<Tools
			size={this.state.brushSize}
			color={this.state.brushColor}
			onDrawClick={this.setBrushMode}
			onEraseClick={this.setEraserMode}
			onTextClick={this.handleToolTextClick}
			onShapeClick={this.setShapeMode}
			onClearClick={this.clearCanvas}
			onBrushSizeChange={this.handleBrushSizeChange}
			onColorChange={this.handleColorChange}
			onCancel={this.handleClose}
			onUndo={this.props.undo}
			onRedo={this.props.redo}
			onSave={this.handleSave}
			disabled={this.props.disabled}
			mode={this.state.mode}
			activeShape={this.state.activeShape}
			selectedObjectName={this.state.selectedObjectName}
			arePastElements={this.props.arePastElements}
			areFutureElements={this.props.areFutureElements}
		/>
	)

	public handleStageMouseDown = ({ target }) => {
		if (target.attrs.name !== this.state.selectedObjectName &&
			(target.getParent() && target.getParent().className !== 'Transformer')) {
			this.setState({ selectedObjectName: '' });
			return;
		}
	}

	public getEditableTextareaStyles = () => {
		return {
			display: this.state.textEditable.visible ? 'block' : 'none',
			...this.state.textEditable.styles
		};
	}

	public render() {
		const { stage } = this.state;

		return (
			<Container ref={this.containerRef}>
				<EventListener
					target="window"
					onResize={this.handleResize}
				/>
				{this.renderIndicator(!this.props.disabled && this.isDrawingMode && !this.state.selectedObjectName)}
				{this.renderTools()}
				<Stage ref={this.stageRef} height={stage.height} width={stage.width} onMouseDown={this.handleStageMouseDown}>
					{this.renderLayers()}
				</Stage>
				{this.renderEditableTextarea(this.state.textEditable.visible)}
			</Container>
		);
	}
}
