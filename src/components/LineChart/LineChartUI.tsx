import * as React from 'react'
import { ILineChartProps, IStateProps } from './index'
// import { Row, Col, Input, Icon, Button } from 'antd'
import './index.less'

interface ICanvasData {
  name: string,
  data: number[],
  color: string
}

interface IMousePosition {
  x?: number | null,
  y?: number | null
}


class LineChart extends React.Component<ILineChartProps> {
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


  public canvasInit() {
    const dataA = {
      name: '净利润同比增长率',
      data: [441, 132, 222, 333, 444, 513, 416, 132, 222],
      color: 'rgb(208,148,98)'
    }
    const dataB = {
      name: '营业收入同比增长率',
      data: [123, 124, 512, 151, 626, 735, 123, 423, 563],
      color: 'rgb(163,201,233)'
    }
    const canvas = this.refs.canvas
    goBarChart(canvas, [dataA, dataB])
  }

  public render() {
    const CANVAS_DOM = 'canvas'
    return (
      <div className="BarChart-box">
        <canvas width="900" height="400" ref={CANVAS_DOM} />
      </div >
    )
  }
}

export default LineChart

function goBarChart(canvas: any, dataList: ICanvasData[]) {
  const argumentsList = dataList
  let ctx: any
  let cWidth: number, cHeight: number, originX: number, originY: number, cMargin: number
  // let XmaxValue: number
  let YmaxValue: number, YminValue: number, Ytotal: number, Ynumber: number
  let dataArr: any, tobalBars, XdataList: string[], totalNumber: number
  let arcD: number, mouseMoveArcD: number

  let ctr = 1
  let numctr = 100
  let speed = 10

  const mousePosition: IMousePosition = {}
  // const mouseClickLine: any = null

  let tMap: any = []
  let TdataList: string[]
  let tWidth: number, tHeight: number, TarcMargin: number
  // tslint:disable-next-line: prefer-const
  let ToriginY: number
  let DataMarkerKey: number

  if (canvas && canvas.getContext) {
    ctx = canvas.getContext('2d')
  }
  initChart()
  drawLineLabelMarkers()
  drawLineAnimate()

  // let mouseTimer = null
  // canvas.addEventListener("mousemove", function (e) {
  //   e = e || window.event
  //   if (e.layerX || e.layerX == 0) {
  //     mousePosition.x = e.layerX;
  //     mousePosition.y = e.layerY;
  //   } else if (e.offsetX || e.offsetX == 0) {
  //     mousePosition.x = e.offsetX;
  //     mousePosition.y = e.offsetY;
  //   }
  //   clearTimeout(mouseTimer);
  //   mouseTimer = setTimeout(function () {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     drawLineLabelMarkers();
  //     drawLineAnimate(true);
  //   }, 10);
  // })
  setTimeout(() => {
    canvas.addEventListener('click', (e: any) => {
      e = e || window.event
      if (e.layerX || e.layerX === 0) {
        mousePosition.x = e.layerX;
        mousePosition.y = e.layerY;
      } else if (e.offsetX || e.offsetX === 0) {
        mousePosition.x = e.offsetX;
        mousePosition.y = e.offsetY;
      }
      if (mousePosition.x && mousePosition.y && cMargin < mousePosition.x && cMargin < mousePosition.y) {
        if (mousePosition.x < originX && mousePosition.y < originY) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          drawLineLabelMarkers()
          drawLineAnimate(false, true)
        }
      }
      handleTag(mousePosition)
    })
  }, speed * numctr)

  function handleTag(mousePosition: IMousePosition) {
    for (const item of tMap) {
      const xMarkerMin = item.x - TarcMargin
      const xMarkerMax = xMarkerMin + item.w
      const yMarkerMin = item.y - tHeight
      const yMarkerMax = item.y
      if (mousePosition.x && mousePosition.y && xMarkerMin < mousePosition.x && yMarkerMin < mousePosition.y) {
        if (xMarkerMax > mousePosition.x && yMarkerMax > mousePosition.y) {
          ctx.clearRect(0, 0, cWidth, ToriginY)
          ctr = 0
          if (TdataList.indexOf(item.name) !== -1) {
            TdataList.splice(TdataList.indexOf(item.name), 1)
            drawTagMarkers(argumentsList)
            drawLineAnimate()
          } else {
            TdataList.push(item.name)
            drawTagMarkers(argumentsList)
            drawLineAnimate()
          }
        }
      }
    }
  }

  function drawLineLabelMarkers() {
    ctx.translate(.5, .5)
    ctx.lineWidth = 1

    drawLine(cMargin, originY, originX, originY) // X
    drawLine(cMargin, cMargin, cMargin, originY) // Y
    ctx.translate(-0.5, -0.5)
    drawMarkers()
    drawTagMarkers(argumentsList)
  }

  function drawLineAnimate(mouseMove?: boolean, mouseClick?: boolean) {

    ctx.beginPath()
    for (let i = 0; i <= totalNumber; i++) {
      ctx.lineWidth = 1
      for (let j = 0; j < argumentsList.length; j++) {
        ctx.fillStyle = argumentsList[j].color
        if (TdataList.indexOf(argumentsList[j].name) !== -1) {
          drawLineByData(argumentsList[j].data, i, argumentsList[j].color)
        }
        ctx.fillStyle = 'black'
      }
    }
    ctx.closePath()
    for (let i = 0; i < argumentsList.length; i++) {
      if (TdataList.indexOf(argumentsList[i].name) !== -1) {
        drawArcMarkers(argumentsList[i].data, mouseMove)
      }
    }

    if (ctr < numctr) {
      ctr++
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawLineAnimate()
        ctx.clearRect((ctr / numctr) * canvas.width, 0, canvas.width, canvas.height)
        drawLineLabelMarkers()
      }, speed)
    }

    if (mouseClick) {
      const TextXMargin = 5
      const TextYMargin = 24
      ctx.translate(.5, .5)
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 1
      for (let i = 0; i <= totalNumber; i++) {
        const xMarker = ((originX - cMargin) * (i / totalNumber)) + cMargin * 2
        DataMarkerKey = i
        if (i === 0) {
          if (mousePosition.x && mousePosition.x <= xMarker) {
            drawMouseClickText(xMarker, TextXMargin, TextYMargin)
          }
        }
        if (i !== 0) {
          const xMarkerBefore = ((originX - cMargin) * ((i - 1) / totalNumber)) + cMargin * 2
          if (mousePosition.x && xMarkerBefore <= mousePosition.x) {
            if (mousePosition.x <= xMarker) {
              drawMouseClickText(xMarker, TextXMargin, TextYMargin)
            }
          }
        }
      }
      ctx.translate(-0.5, -0.5)
      ctx.strokeStyle = 'black'
      ctx.lineWidth = .3
    }
  }

  function drawMouseClickText(xMarker: number, TextXMargin: number, TextYMargin: number) {
    let w = 0
    const h = 40
    let markerVal
    for (let i = 0; i < argumentsList.length; i++) {
      if (TdataList.indexOf(argumentsList[i].name) !== -1) {
        w += 40
        markerVal = argumentsList[i].data[DataMarkerKey]
        ctx.fillStyle = argumentsList[i].color
        ctx.fillText(markerVal, xMarker + TextXMargin + w, mousePosition.y as number + TextYMargin)
        ctx.fillStyle = 'black'
      }
    }
    if (argumentsList.length !== 0) {
      drawLine(xMarker, cMargin, xMarker, originY)
      ctx.fillStyle = 'rgba(0,0,0,.2)'
      drawRect(xMarker + 30, mousePosition.y as number, w + TextXMargin, h)
      ctx.fillStyle = 'rgba(0,0,0,1)'
    }
  }
  function drawTagMarkers(argumentsList: any) {
    ctx.font = '14px "Helvetica Neue", Helvetica, Arial, sans-serif'
    ctx.textAlign = 'left'
    const TagMargin = 30
    const tMapNow = []
    for (let i = 0; i < argumentsList.length; i++) {
      let xMarker = cMargin / 2
      const yMarker = ToriginY
      tWidth = 0
      for (let j = 0; j < argumentsList[i].name.length; j++) {
        tWidth += 14
      }
      for (let j = 0; j < tMapNow.length; j++) {
        xMarker += tMapNow[j].w + TagMargin
      }
      const tagItem = {
        name: argumentsList[i].name,
        x: xMarker,
        y: ToriginY,
        w: tWidth,
        h: tHeight,
        background: argumentsList[i].color
      }
      tMapNow.push(tagItem)
      drawRect(xMarker, yMarker - 15, tWidth, tHeight)
      if (TdataList.indexOf(argumentsList[i].name) !== -1) {
        drawArc(xMarker - TarcMargin, yMarker - 5, 5, 0, Math.PI * 2)
        ctx.fillStyle = argumentsList[i].color
        ctx.fillText(argumentsList[i].name, xMarker, yMarker)
      } else {
        ctx.globalAlpha = .6
        drawArc(xMarker - TarcMargin, yMarker - 5, 5, 0, Math.PI * 2)
        ctx.fillStyle = argumentsList[i].color
        ctx.fillText(argumentsList[i].name, xMarker, yMarker)
        ctx.globalAlpha = 1
        drawLine(xMarker - TarcMargin, yMarker - 5, xMarker - TarcMargin + tWidth, yMarker - 5)
      }
    }
    tMap = tMapNow
    ctx.fillStyle = 'black'
    ctx.font = '11px "Helvetica Neue", Helvetica, Arial, sans-serif'
  }

  function drawMarkers() {
    ctx.textAlign = 'center'
    // const oneVal = (XmaxValue / 10) + (XmaxValue / 100)
    // const totalValueX = oneVal * 10 / 2
    // const tobalBarsM = 5
    const oneDiff = Ytotal / Ynumber
    // X
    for (let i = 0; i <= totalNumber; i++) {
      const markerVal = XdataList[i]
      const xMarker = ((originX - cMargin) * (i / totalNumber)) + cMargin
      const yMarker = cHeight - 15
      i % 2 !== 0 ? ctx.translate(-0.5, -0.5) : ctx.translate(0.5, 0.5)
      i !== totalNumber ? ctx.fillText(markerVal, xMarker + cMargin, yMarker) : ctx.fillText(0, cMargin, yMarker)
      ctx.lineWidth = .3
    }
    // Y
    for (let i = 0; i < Ynumber + 1; i++) {
      const markerVal = YmaxValue - (i * oneDiff)
      const xMarker = cMargin - 30
      const yMarker = (((i * oneDiff) / Ytotal) * (originY - cMargin)) + cMargin
      if (i !== Ynumber) { drawLine(cMargin, yMarker, originX, yMarker) }
      ctx.fillText(markerVal.toFixed(2), xMarker, yMarker)
    }
  }

  function drawLineByData(data: number[], key: number, color: string) {
    ctx.strokeStyle = color
    const xMarker = ((originX - cMargin) * (key / totalNumber)) + cMargin * 2
    const yMarker = originY - ((data[key] / YmaxValue) * (originY - cMargin))
    if (key !== 0) {
      const xMarkerBefore = ((originX - cMargin) * ((key - 1) / totalNumber)) + cMargin * 2
      const yMarkerBefore = originY - ((data[key - 1] / YmaxValue) * (originY - cMargin))
      if (key !== totalNumber) {
        drawLine(xMarkerBefore, yMarkerBefore, xMarker, yMarker)
      }
      if (key !== totalNumber) { drawLine(xMarkerBefore, yMarkerBefore, xMarker, yMarker) }
    }
  }

  function drawArcMarkers(data: number[], mouseMove: boolean | undefined) {
    for (let i = 0; i <= totalNumber; i++) {
      const xMarker = ((originX - cMargin) * (i / totalNumber)) + cMargin * 2
      const yMarker = originY - ((data[i] / YmaxValue) * (originY - cMargin))
      if (mouseMove && ctx.isPointInPath(mousePosition.x, mousePosition.y)) {
        const mouseMovexMarker = ((originX - cMargin) * ((i - 1) / totalNumber)) + cMargin * 2
        const mouseMoveyMarker = originY - ((data[i - 1] / YmaxValue) * (originY - cMargin))
        if (i !== totalNumber) {
          drawArc(mouseMovexMarker, mouseMoveyMarker, mouseMoveArcD, 0, 2 * Math.PI)
          drawArc(xMarker, yMarker, arcD, 0, 2 * Math.PI)
        }
      } else {
        if (i !== totalNumber) { drawArc(xMarker, yMarker, arcD, 0, 2 * Math.PI) }
      }
    }
  }

  function drawArc(x: number, y: number, d: number, s: number, e: number) {
    ctx.beginPath();
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#999'
    ctx.arc(x, y, d, s, e);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
  }

  function drawRect(x: number, y: number, W: number, H: number) {
    ctx.beginPath()
    ctx.fillRect(x, y, W, H)
    ctx.stroke()
    ctx.closePath()
  }

  function drawLine(x: number, y: number, X: number, Y: number) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(X, Y)
    ctx.stroke()
    ctx.closePath()
  }

  function initChart() {
    cMargin = 60
    cWidth = canvas.width
    cHeight = canvas.height
    originX = cWidth - cMargin
    originY = cHeight - cMargin

    Ynumber = 6

    XdataList = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
    totalNumber = XdataList.length

    arcD = 5
    mouseMoveArcD = 10

    ctr = 1;
    numctr = 100;
    speed = 10;

    tHeight = 20
    TarcMargin = 10
    TdataList = ["净利润同比增长率", "营业收入同比增长率"]

    dataArr = []
    for (let i = 0; i < argumentsList.length; i++) {
      if (TdataList.indexOf(argumentsList[i].name) !== -1) {
        dataArr = dataArr.concat(argumentsList[i].data)
      }
    }

    tobalBars = dataArr.length
    YminValue = 0
    YmaxValue = 0
    for (let i = 0; i < tobalBars; i++) {
      const barVal = dataArr[i]
      if (barVal > YmaxValue) {
        YmaxValue = barVal
      }
    }
    YminValue = YmaxValue
    for (let i = 0; i < tobalBars; i++) {
      const barVal = dataArr[i]
      if (barVal < YminValue) {
        YminValue = barVal
      }
    }
    Ytotal = (YmaxValue * 100 - YminValue * 100) / 100
  }
}