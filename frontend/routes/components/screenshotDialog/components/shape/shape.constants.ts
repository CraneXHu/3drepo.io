import { Rectangle, Circle, Triangle, Line, Cloud } from './shape.helpers';

export const SHAPE_TYPES = {
	RECTANGLE: 1,
	TRIANGLE: 2,
	CIRCLE: 3,
	LINE: 4,
	CLOUD: 5
};

export const SHAPE_COMPONENTS = {
	[SHAPE_TYPES.RECTANGLE]: Rectangle,
	[SHAPE_TYPES.TRIANGLE]: Triangle,
	[SHAPE_TYPES.CIRCLE]: Circle,
	[SHAPE_TYPES.LINE]: Line,
	[SHAPE_TYPES.CLOUD]: Cloud
};
