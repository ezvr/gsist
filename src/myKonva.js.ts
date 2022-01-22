import Konva from 'konva'

class MyKonva {
    canvasID: any
    stage: any
    width: number = 353
    height: number = 500
    rectAr: Array<any>

    constructor(canvasRef: any) {
        this.canvasID = canvasRef.current

        this.rectAr = []


        this.stage = new Konva.Stage({
                container: this.canvasID,   // id of container <div>
                width: this.width,
                height: this.height,
            }
        );
        this.stage.on('click tap', () => {
        this.progressFig5()
        })

    }


    x(position: number) {
        if (position > 7) throw new Error('Value too high');
        return this.width / 7 * position

    }

    y(position: number) {
        if (position > 10) throw new Error('Value too high');
        return this.height / 10 * position

    }

    drawFig5() {
        let Fig5Layer = new Konva.Layer()
        this.rectAr = Array.from(Array(25).keys()).map((id: number) => new Figura5(id, this.x, this.y, Fig5Layer))
        this.stage.add(Fig5Layer)


        const setInternals = () => {
            this.rectAr.forEach((box, index) => {
                setTimeout(function () {
                    box.setInternal(getRandomInt(4))
                }, 2000 + 50 * index);
            })
        }
        setInternals()

    }

    drawIntro() {
        let introLayer = new Konva.Layer()
        let intro = new Intro(introLayer, this.width, this.height)
        intro.doIntro()
        this.stage.add(introLayer)
    }

    progressFig5() {
        if (this.rectAr.length !== 0) {
            this.rectAr[0].updateInternal(getRandomInt(4))

            this.rectAr.forEach((box, index) => {
                if (index !== 0)
                    box.updateInternal(this.rectAr[index - 1].getInternalOld())
            })
        }
    }

}

class Figura5 {
    squareID: number
    internalPosition: any

    stage: any
    position: any
    internalLayer: any
    internalType: any
    internalTypeOld: any

    constructor(squareID: number, x: any, y: any, stage: any) {
        this.squareID = squareID
        this.internalPosition = []

        this.stage = stage
        this.position = this.determinePos()

        this.drawRect()
        this.internalLayer = new Konva.Group()

    }

    x(position: number) {
        if (position > 7) throw new Error('Value too high');
        return 353 / 7 * position

    }

    y(position: number) {
        if (position > 10) throw new Error('Value too high');
        return 500 / 10 * position

    }

    xInternal(position: number) {
        if (position > 2) throw new Error('Value too high');
        return this.x(this.position[0]) + 12.5 / 2 + (this.x(1) - 12.5) / 2 * position
    }

    yInternal(position: number) {
        if (position > 2) throw new Error('Value too high');
        return this.y(this.position[1]) + 12.5 / 2 + (this.x(1) - 12.5) / 2 * position
    }

    setInternal(type: number) {
        this.internalType = type
        this.internalTypeOld = type
        this.drawInternal(type)
    }

    updateInternal(type: number) {
        this.internalTypeOld = this.internalType
        this.internalType = type
        this.drawInternal(type)
    }

    drawInternal(type: number) {

        switch (type) {
            case 0:
                this.internalPosition[0] = this.xInternal(0)
                this.internalPosition[1] = this.yInternal(0)
                this.internalPosition[2] = this.xInternal(2)
                this.internalPosition[3] = this.yInternal(2)
                break;
            case 1:
                this.internalPosition[0] = this.xInternal(0)
                this.internalPosition[1] = this.yInternal(1)
                this.internalPosition[2] = this.xInternal(2)
                this.internalPosition[3] = this.yInternal(1)
                break;
            case 2:
                this.internalPosition[0] = this.xInternal(1)
                this.internalPosition[1] = this.yInternal(0)
                this.internalPosition[2] = this.xInternal(1)
                this.internalPosition[3] = this.yInternal(2)
                break;
            case 3:
                this.internalPosition[0] = this.xInternal(2)
                this.internalPosition[1] = this.yInternal(0)
                this.internalPosition[2] = this.xInternal(0)
                this.internalPosition[3] = this.yInternal(2)
                break;
        }

        let line = new Konva.Line({
            points: this.internalPosition,
            stroke: 'black',
            strokeWidth: 8,
        })
        this.internalLayer.destroyChildren()
        this.internalLayer.add(line);
        this.stage.add(this.internalLayer)

    }

    getInternal() {
        return this.internalType
    }

    getInternalOld() {
        return this.internalTypeOld
    }

    determinePos() {
        let y = Math.floor(this.squareID / 5)
        let x = this.squareID - y * 5

        return [x + 1, y + 1]
    }


    drawRect() {


        let rect2 = new Konva.Rect({
            x: this.x(this.position[0]) + 12.5 / 2,
            y: this.y(this.position[1]) + 12.5 / 2,
            width: this.x(1) - 12.5,
            height: this.y(1) - 12.5,
            stroke: 'black',
            strokeWidth: 0,
        });
        this.stage.add(rect2);

        let tween = new Konva.Tween({
            node: rect2,
            duration: 0.15,
            easing: Konva.Easings.EaseOut,
            strokeWidth: 8,
        });

        setTimeout(function () {
            tween.play();

        }, 1000 + 50 * this.squareID);

    }


}

class Intro {
    layer: any
    width: number
    height: number
    tweenArray: any

    constructor(layer: any, width: number, height: number) {
        this.layer = layer
        this.width = width
        this.height = height
    }

    x(position: number) {
        if (position > 7) throw new Error('Value too high');
        return this.width / 7 * position

    }

    y(position: number) {
        if (position > 10) throw new Error('Value too high');
        return this.height / 10 * position

    }

    constructLines(group: any) {
        let linesCoordsStart = [
            [0, 0, 0, 0],
            [0, 10, 0, 10],
            [7, 10, 7, 10],
            [7, 0, 7, 0],

            [0, 0, 0, 0],
            [7, 0, 7, 0],

            [0, 0, 0, 0],
            [0, 7, 0, 7],
            [7, 0, 7, 0],
        ]
        let linesCoordsEnd = [
            [0, 0, 0, 10],
            [0, 10, 7, 10],
            [7, 10, 7, 0],
            [7, 0, 0, 0],

            [0, 0, 7, 10],
            [7, 0, 0, 10],

            [0, 0, 7, 7],
            [0, 7, 7, 7],
            [7, 0, 0, 7],

        ]

        return linesCoordsEnd.map((lineEnd, index) => {
            let line = new Konva.Line({
                points: [this.x(linesCoordsStart[index][0]), this.y(linesCoordsStart[index][1]), this.x(linesCoordsStart[index][2]), this.y(linesCoordsStart[index][3])],
                stroke: 'black',
                strokeWidth: 1,
            })
            group.add(line);

            return new Konva.Tween({
                node: line,
                duration: 0.25,
                easing: Konva.Easings.EaseOut,
                points: [this.x(lineEnd[0]), this.y(lineEnd[1]), this.x(lineEnd[2]), this.y(lineEnd[3])],
            });
        })
    }

    constructSquare(group: any) {
        let squareCoordsStart = [
            [2, 2, 2, 2],
            [2, 5, 2, 5],
            [5, 5, 5, 5],
            [5, 2, 5, 2],
            [0, 7, 0, 7],

        ]
        let squareCoordsEnd = [
            [2, 2, 2, 5],
            [2, 5, 5, 5],
            [5, 5, 5, 2],
            [5, 2, 2, 2],
            [0, 7, 7, 7],

        ]

        return squareCoordsEnd.map((squareEnd, index) => {
            let line = new Konva.Line({
                points: [this.x(squareCoordsStart[index][0]), this.y(squareCoordsStart[index][1]), this.x(squareCoordsStart[index][2]), this.y(squareCoordsStart[index][3])],
                stroke: 'black',
                strokeWidth: 2,
            })
            group.add(line);

            return new Konva.Tween({
                node: line,
                duration: 0.35,
                easing: Konva.Easings.EaseOut,
                points: [this.x(squareEnd[0]), this.y(squareEnd[1]), this.x(squareEnd[2]), this.y(squareEnd[3])],
            });
        })

    }

    doIntro() {
        let lineGroup = new Konva.Group()
        this.layer.add(lineGroup)
        let tweenArray = this.constructLines(lineGroup)

        tweenArray.forEach((tween, index) => {
            setTimeout(function () {
                tween.play();

            }, 150 * index);
        })
        let squareGroup = new Konva.Group()
        this.layer.add(squareGroup)
        let squareArray = this.constructSquare(squareGroup)
        squareArray.forEach((tween, index) => {
            setTimeout(function () {
                tween.play();
            }, 1000 + 150 * index);
        })

        setTimeout(function () {
            let tween = new Konva.Tween({
                node: lineGroup,
                duration: 1,
                opacity: 0
            });
            tween.play()
        }, 3000);
        setTimeout(function () {
            let tween = new Konva.Tween({
                node: squareGroup,
                duration: 2,
                opacity: 0
            });
            tween.play()
        }, 4000);

    }

}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export default MyKonva
