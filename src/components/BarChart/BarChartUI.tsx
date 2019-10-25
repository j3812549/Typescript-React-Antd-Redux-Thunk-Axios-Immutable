import * as React from 'react'
import { IBarChartProps, IStateProps } from './index'
// import { Row, Col, Input, Icon, Button } from 'antd'
import './index.less'


class BarChart extends React.Component<IBarChartProps> {
  public state: IStateProps
  constructor(props: any) {
    super(props)
    this.state = {
    }
    this.canvasInit = this.canvasInit.bind(this)
  }

  public componentDidMount() {
    this.canvasInit()
  }

  public canvasInit(action?: number, total?: number) {
    const data = [[2007, 750], [2008, 425], [2009, 960], [2010, 700], [2011, 800], [2012, 975], [2013, 375], [2014, 775]]
    const canvas = this.refs.canvas
    goBarChart(canvas, data)
  }

  public render() {
    const CANVAS_DOM = 'canvas'
    return (
      <div className="BarChart-box">
        <canvas width="800" height="600" ref={CANVAS_DOM} />
      </div >
    )
  }
}

export default BarChart

interface IMousePosition {
  x?: number,
  y?: number
}

function goBarChart(canvas: any, dataArr: any[]) {
  // 声明所需变量
  let ctx: any;
  // 图表属性
  let cWidth: number, cHeight: number, cMargin: number, cSpace: number;
  let originX: number, originY: number;
  // 柱状图属性
  let bMargin: number, tobalBars: number, bWidth: number, maxValue: number;
  let totalYNomber: number;
  let gradient: any;

  // 运动相关变量
  let ctr: any, numctr: number, speed: number;
  // 鼠标移动
  const mousePosition: IMousePosition = {};

  // 获得canvas上下文
  if (canvas && canvas.getContext) {
    ctx = canvas.getContext("2d");
  }
  initChart(); // 图表初始化
  drawLineLabelMarkers(); // 绘制图表轴、标签和标记
  drawBarAnimate(); // 绘制柱状图的动画
  // //检测鼠标移动
  let mouseTimer: any = null;
  canvas.addEventListener("mousemove", (e: any) => {
    e = e || window.event;
    if (e.layerX || e.layerX === 0) {
      mousePosition.x = e.layerX;
      mousePosition.y = e.layerY;
    } else if (e.offsetX || e.offsetX === 0) {
      mousePosition.x = e.offsetX;
      mousePosition.y = e.offsetY;
    }

    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLineLabelMarkers();
      drawBarAnimate(true);
    }, 10);
  });

  // 点击刷新图表
  canvas.onclick = () => {
    initChart(); // 图表初始化
    drawLineLabelMarkers(); // 绘制图表轴、标签和标记
    drawBarAnimate(); // 绘制折线图的动画
  };


  // 图表初始化
  function initChart() {
    // 图表信息
    cMargin = 30;
    cSpace = 60;
    cHeight = canvas.height - cMargin * 2 - cSpace;
    cWidth = canvas.width - cMargin * 2 - cSpace;
    originX = cMargin + cSpace;
    originY = cMargin + cHeight;

    // 柱状图信息
    bMargin = 15;
    tobalBars = dataArr.length;
    bWidth = Number((cWidth / tobalBars - bMargin).toFixed(0));
    maxValue = 0;
    for (const item of dataArr) {
      const barVal = Number(item[1].toFixed(0));
      if (barVal > maxValue) {
        maxValue = barVal;
      }
    }
    maxValue += 50;
    totalYNomber = 10;
    // 运动相关
    ctr = 1;
    numctr = 100;
    speed = 10;

    // 柱状图渐变色
    gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(1, 'rgba(67,203,36,1)');

  }

  // 绘制图表轴、标签和标记
  function drawLineLabelMarkers() {
    ctx.translate(0.5, 0.5);  // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
    ctx.font = "12px Arial";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    // y轴
    drawLine(originX, originY, originX, cMargin);
    // x轴
    drawLine(originX, originY, originX + cWidth, originY);

    // 绘制标记
    drawMarkers();
    ctx.translate(-0.5, -0.5);  // 还原位置
  }

  // 画线的方法
  function drawLine(x: number, y: number, X: number, Y: number) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(X, Y);
    ctx.stroke();
    ctx.closePath();
  }

  // 绘制标记
  function drawMarkers() {
    ctx.strokeStyle = "#E0E0E0";
    // 绘制 y
    // tslint:disable-next-line: radix
    const oneVal = maxValue / totalYNomber;
    ctx.textAlign = "right";
    for (let i = 0; i <= totalYNomber; i++) {
      const markerVal = i * oneVal;
      const xMarker = originX - 5;
      const yMarker = (cHeight * (1 - markerVal / maxValue)) + cMargin;
      ctx.fillText(markerVal, xMarker, yMarker + 3, cSpace); // 文字
      if (i > 0) {
        drawLine(originX, yMarker, originX + cWidth, yMarker);
      }
    }
    // 绘制 x
    ctx.textAlign = "center";
    for (let i = 0; i < tobalBars; i++) {
      const markerVal = dataArr[i][0];
      const xMarker = originX + cWidth * (i / tobalBars) + bMargin + bWidth / 2;
      const yMarker = originY + 15;
      ctx.fillText(markerVal, xMarker, yMarker, cSpace); // 文字
    }
    // 绘制标题 y
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("产 量", -canvas.height / 2, cSpace - 10);
    ctx.restore();
    // 绘制标题 x
    ctx.fillText("年份", originX + cWidth / 2, originY + cSpace / 2 + 10);
  };

  // 绘制柱形图
  function drawBarAnimate(mouseMove?: boolean) {
    for (let i = 0; i < tobalBars; i++) {
      // const oneVal = maxValue / totalYNomber;
      const barVal = dataArr[i][1];
      const barH = cHeight * barVal / maxValue * ctr / numctr;
      const y = originY - barH;
      const x = originX + (bWidth + bMargin) * i + bMargin;
      drawRect(x, y, bWidth, barH, mouseMove);  // 高度减一避免盖住x轴
      ctx.fillText(barVal * ctr / numctr, x + 15, y - 8); // 文字
    }
    if (ctr < numctr) {
      ctr++;
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLineLabelMarkers();
        drawBarAnimate();
      }, speed);
    }
  }

  // 绘制方块
  function drawRect(x: number, y: number, X: number, Y: number, mouseMove?: boolean) {

    ctx.beginPath();
    ctx.rect(x, y, X, Y);
    if (mouseMove && ctx.isPointInPath(mousePosition.x, mousePosition.y)) { // 如果是鼠标移动的到柱状图上，重新绘制图表
      ctx.fillStyle = "green";
    } else {
      ctx.fillStyle = gradient;
      ctx.strokeStyle = gradient;
    }
    ctx.fill();
    ctx.closePath();

  }
}

