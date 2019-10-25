import * as React from 'react'
import { ISpeedBallProps, IStateProps } from './index'
// import { Row, Col, Input, Icon, Button } from 'antd'
import './index.less'


class SpeedBall extends React.Component<ISpeedBallProps> {
  public state: IStateProps
  constructor(props: any) {
    super(props)
    this.state = {
    }
    this.handleCanvas = this.handleCanvas.bind(this)
    this.canvasInit = this.canvasInit.bind(this)
  }

  public handleCanvas() {
    let action = 1; // 变动的进度
    const total = 100; // 总数
    setInterval(() => {
      if (action < total) {
        action++;
        this.canvasInit(action, total);
      }
    }, 20);
  }

  public componentDidMount() {
    this.canvasInit()
  }

  public canvasInit(action?: number, total?: number) {
    const canvas = this.refs.canvas
    goChar(canvas, action, total)
  }

  public render() {
    const CANVAS_DOM = 'canvas'
    return (
      <div className="SpeedBallUI-box">
        <canvas width="400" height="400" ref={CANVAS_DOM} />
        <div onClick={this.handleCanvas} className="SpeedBallUI-botton">
          点击
        </div>
      </div >
    )
  }
}

export default SpeedBall

interface IOcenter {
  x: number,
  y: number
}

function goChar(canvas: any, actionNumber?: number, totalNumber?: number) {
  let originX: number, originY: number; // 宽高
  let Ocenter: IOcenter, Oradius: number; // 圆心，半径
  let Tradius: number; // 虚线的长度
  let ctx: any;

  let TtotalNumber: number;

  if (canvas && canvas.getContext) {
    ctx = canvas.getContext("2d");
  }
  if (actionNumber && totalNumber) {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  Init();
  drawLineMarkers();
  function drawLineMarkers() {
    // drawLine(Ocenter.x, 0, Ocenter.x, Ocenter.y);

    // 画虚线
    for (let i = -TtotalNumber / 4; i < TtotalNumber - TtotalNumber / 4; i++) {
      const PI = 2 * Math.PI * (i / TtotalNumber);
      const xMarkerA = Math.cos(PI) * Oradius + Ocenter.x; // 虚线的一头的X坐标
      const yMarkerA = Math.sin(PI) * Oradius + Ocenter.y; // 虚线的一头的Y坐标
      const xMarkerB = xMarkerA - Math.cos(PI) * Tradius; // 虚线的另一头的X坐标
      const yMarkerB = yMarkerA - Math.sin(PI) * Tradius; // 虚线的另一头的Y坐标
      ctx.strokeStyle = "#fff";
      if (actionNumber && totalNumber && (i + TtotalNumber / 4) / TtotalNumber < actionNumber / totalNumber) {
        ctx.strokeStyle = "#6CDEC5";
        drawLine(xMarkerA, yMarkerA, xMarkerB, yMarkerB);
        ctx.strokeStyle = "#fff";
      } else {
        drawLine(xMarkerA, yMarkerA, xMarkerB, yMarkerB);
      }
    }

    // 圆
    ctx.font = "32px bold PingFang-SC-Bold";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const linearGradientA = ctx.createLinearGradient(0, 33, 66, 100);
    linearGradientA.addColorStop(0, "rgba(255,255,255,0.1)");
    linearGradientA.addColorStop(1, "rgba(108,222,197,0.1)");
    ctx.fillStyle = linearGradientA;
    ctx.strokeStyle = "#fff";
    // 圆四个参数，X坐标, Y坐标, 圆的半径， 圆的起始度数， 圆的结束度数
    drawArc(Ocenter.x, Ocenter.y, Oradius - Tradius - 18, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "#eee";

    if (actionNumber && totalNumber) {
      let value = (5 * (actionNumber / totalNumber)).toFixed(2);
      if (value === "5.00") {
        value = '5';
        const linearGradientB = ctx.createLinearGradient(0, 33, 66, 100);
        linearGradientB.addColorStop(0, "rgba(0,254,241,0.5)");
        linearGradientB.addColorStop(1, "rgba(0,194,135,0.5)");
        ctx.fillStyle = linearGradientB;
        ctx.strokeStyle = "#fff";
        drawArc(Ocenter.x, Ocenter.y, Oradius - Tradius - 18, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.strokeStyle = "#eee";
        ctx.fillStyle = "#fff";
      }
      ctx.fillStyle = "#fff";
      ctx.fillText(
        value + "M",
        // Number(100 * actionNumber) / Number(totalNumber) + "%",
        Ocenter.x,
        Ocenter.y
      );
    } else {
      ctx.fillStyle = "#fff";
      ctx.fillText("0M", Ocenter.x, Ocenter.y);
    }
  }
  function Init() {
    originX = canvas.width;
    originY = canvas.height;

    Ocenter = {
      x: originX / 2,
      y: originY / 2
    };

    Oradius = originY / 2;
    TtotalNumber = 150; // 虚线的总数

    Tradius = 10; // 虚线的长度
  }

  function drawLine(x: number, y: number, X: number, Y: number) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(X, Y);
    ctx.stroke();
    ctx.closePath();
  }
  function drawArc(x: number, y: number, d: number, s: number, e: number) {
    ctx.beginPath();
    ctx.arc(x, y, d, s, e);
    ctx.fill();
    ctx.stroke();
  }
}