import * as React from 'react';
import {
	Arrow as ArrowComponent,
	Circle as CircleComponent,
	Line as LineComponent,
	Path,
	Rect as RectangleComponent,
	RegularPolygon as PolygonComponent,
} from 'react-konva';

export const cloud = {
	// tslint:disable-next-line
	path: 'M102.75,3.7c19.85,0,43.32,11.7,62.77,31.29l2.7,2.72.69-3.78c2-10.87,6.4-19.18,12.85-24,5.38-4.06,12.64-6.2,21-6.2,19.85,0,43.32,11.7,62.77,31.29l2.7,2.72.69-3.78c2-10.87,6.4-19.18,12.85-24,5.38-4.06,12.64-6.2,21-6.2,19.85,0,43.32,11.7,62.77,31.29l2.7,2.72.69-3.78c2-10.87,6.4-19.18,12.85-24,5.38-4.06,12.64-6.2,21-6.2,19.85,0,43.32,11.7,62.77,31.29l.44.44.62.12c10.87,2,19.18,6.4,24,12.85,6.58,8.74,8,21.77,4,36.71-4.3,16-14.62,32.7-29.07,47.05l-2.72,2.7,3.77.69c10.87,2,19.18,6.4,24,12.85,6.58,8.73,8,21.77,4,36.71-4.3,16-14.62,32.7-29.07,47l-2.72,2.7,3.77.69c10.87,2,19.18,6.4,24,12.85,6.58,8.74,8,21.77,4,36.71-4.3,16-14.62,32.7-29.07,47.05l-2.72,2.7,3.77.69c10.87,2,19.18,6.4,24,12.85,6.58,8.74,8,21.77,4,36.71-4.3,16-14.62,32.7-29.07,47.05l-1,.95.53,1.25c3.56,8.33,6.83,20.89,2.23,33.49C458.64,491.66,427.45,498,410.4,498H409c-33.6-.67-54.79-26.63-58.7-31.83l-2.65-3.53-.91,4.32c-2.27,10.85-7.42,19.15-14.9,24-6.31,4.11-14.83,6.28-24.61,6.28-23.13,0-50.44-11.73-73-31.39l-2.66-2.3-.62,3.46c-2,10.87-6.41,19.18-12.85,24-5.39,4.06-12.64,6.2-21,6.2-19.86,0-43.32-11.7-62.77-31.29l-2.71-2.72-.68,3.78c-2,10.87-6.41,19.18-12.85,24-5.39,4.06-12.64,6.2-21,6.2-19.86,0-43.32-11.7-62.77-31.29l-.45-.44-.62-.12c-10.87-2-19.18-6.4-24-12.85-6.58-8.73-8-21.77-4-36.71,4.29-16,14.61-32.7,29.07-47l2.72-2.7-3.78-.69c-10.87-2-19.18-6.4-24-12.85-6.58-8.73-8-21.77-4-36.71,4.29-16,14.61-32.7,29.07-47l2.72-2.7-3.78-.69c-10.87-2-19.18-6.4-24-12.85-6.58-8.73-8-21.77-4-36.71,4.29-16,14.61-32.7,29.07-47.05l1.64-1.63-1.86-1.39c-8.48-6.35-28.59-24.13-32.09-52C-.08,97.4,3.88,79.22,12.85,63.94s21.8-25.67,35.26-28.6a39.77,39.77,0,0,1,8.55-.91,46.24,46.24,0,0,1,9.85,1.1l2,.45.37-2c2-10.87,6.4-19.18,12.85-24,5.38-4.06,12.64-6.2,21-6.2m0-2C94,1.7,86.37,3.92,80.56,8.3c-3.45,2.6-10.74,9.33-13.62,25.28a48.1,48.1,0,0,0-10.28-1.15,42,42,0,0,0-9,1C18.2,39.81-4.42,78.86,0,114.06c3.82,30.37,26.59,48.61,32.88,53.31-31.33,31.11-39.16,68-25.28,86.39,2.6,3.44,9.33,10.73,25.28,13.61-31.33,31.11-39.16,68-25.28,86.39,2.6,3.44,9.33,10.73,25.28,13.61-31.33,31.11-39.16,68-25.28,86.39,2.6,3.44,9.33,10.73,25.28,13.61,21.29,21.45,45.27,31.88,64.19,31.88,8.72,0,16.37-2.22,22.19-6.6,3.45-2.6,10.73-9.33,13.62-25.28,21.29,21.45,45.27,31.88,64.19,31.88,8.72,0,16.37-2.22,22.19-6.6,3.45-2.6,10.73-9.33,13.62-25.28,24.66,21.45,52.43,31.88,74.35,31.88,10.1,0,19-2.22,25.7-6.6,4-2.6,12.43-9.33,15.77-25.28,3.11,4.14,24.71,31.92,60.26,32.63h1.44c18.65,0,49.87-7,58.81-31.48,5.36-14.67.29-29-2.27-34.95,31.33-31.11,39.16-68,25.27-86.39-2.59-3.44-9.33-10.73-25.27-13.61,31.33-31.11,39.16-68,25.27-86.39-2.59-3.44-9.33-10.73-25.27-13.61,31.33-31.11,39.16-68,25.27-86.39-2.59-3.44-9.33-10.73-25.27-13.61,31.33-31.11,39.16-68,25.27-86.39-2.59-3.44-9.33-10.73-25.27-13.61C445.64,12.13,421.67,1.7,402.75,1.7c-8.73,0-16.38,2.22-22.19,6.6-3.45,2.6-10.74,9.33-13.62,25.28C345.64,12.13,321.67,1.7,302.75,1.7c-8.73,0-16.38,2.22-22.19,6.6-3.45,2.6-10.74,9.33-13.62,25.28C245.64,12.13,221.67,1.7,202.75,1.7c-8.73,0-16.38,2.22-22.19,6.6-3.45,2.6-10.74,9.33-13.62,25.28C145.64,12.13,121.67,1.7,102.75,1.7Z',
	height: 500,
	width: 500
};

export const cloudline = {
	// tslint:disable-next-line
	path: 'M158.94,10.48A10,10,0,0,0,154.8,5.6c-3.65-1.89-8.41,0-11.65,4.88-.56-1.63-1.83-4.65-4.14-6.16-3.65-2.39-8.41,0-11.65,6.16-2.83-5.86-7.32-8.37-11-6.43-2.81,1.48-4.28,5.07-4.77,6.43-.42-.69-2.56-4.08-6.43-4.76C101.63,5.1,98,7,95.79,10.48c-2-4.68-6.15-7.14-9.9-6.13-4,1.08-5.71,5.62-5.89,6.13A10,10,0,0,0,75.86,5.6c-3.66-1.89-8.41,0-11.65,4.88-.57-1.63-1.84-4.65-4.14-6.16-3.65-2.39-8.41,0-11.65,6.16-2.84-5.86-7.32-8.37-11-6.43-2.81,1.48-4.28,5.07-4.77,6.43-.42-.69-2.56-4.08-6.43-4.76C22.69,5.1,19.09,7,16.85,10.48,14.88,5.8,10.7,3.34,7,4.35c-4,1.08-5.71,5.62-5.89,6.13',
	height: 9,
	width: 159
};

const TriangleComponent = React.forwardRef((props: any, ref: any) => {
	return (
		<PolygonComponent
			{...props}
			ref={ref}
			sides={3}
		/>
	);
});

const CloudComponent = React.forwardRef((props: any, ref: any) => {
	return (
		<Path
			{...props}
			ref={ref}
			data={cloud.path}
		/>
	);
});

const CloudlineComponent = React.forwardRef((props: any, ref: any) => {
	return (
		<Path
			{...props}
			ref={ref}
			data={cloudline.path}
		/>
	);
});

export const Arrow = ArrowComponent;
export const Circle = CircleComponent;
export const Rectangle = RectangleComponent;
export const Triangle = TriangleComponent;
export const Line = LineComponent;
export const Cloud = CloudComponent;
export const Cloudline = CloudlineComponent;
