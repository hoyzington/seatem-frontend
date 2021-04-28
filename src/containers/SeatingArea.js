import React from 'react'
import Chair from '../components/Chair'
import Table from '../components/Table'

class SeatingArea extends React.Component {

  recommendedTableSize = (tableType, qty) => {
    if (tableType == 'rnd') {
      switch (qty) {
        case 4:
          return '2.5-3.5 ft | 30-42 in | .76-1.07 m'
        case 5:
          return '3.5-4 ft | 42-48 in | 1.07-1.22 m'
        case 6:
          return '4-4.5 ft | 48-54 in | 1.22-1.37 m'
        case 7:
          return '4-4.5 ft | 48-54 in | 1.22-1.37 m'
        case 8:
          return '4.5-5.5 ft | 54-66 in | 1.37-1.68 m'
        case 9:
          return '5-5.5 ft | 60-66 in | 1.52-1.68 m'
        case 10:
          return '5-6 ft | 60-72 in | 1.52-1.83 m'
        case 11:
        case 12:
          return '6 ft | 72 in | 1.83 m'
        default:
          return ''
      }
    }
    const feet = qty - (qty %2 == 0 ? 2 : 1)
    const meters = Math.round(feet * .3048 * 100) / 100
    return `${feet} ft | ${feet * 12} in | ${meters} m`
  }

  calcAreaWidth = (qty) => {
    const tableWidth = ((qty - (qty %2 == 0 ? 2 : 1)) / 2) * 88
    const chairsWidth = 70 * 2
    return {width: tableWidth + chairsWidth +'px'}
  }

  tableStyle = (type, qty) => {
    let tblWidth = 264
    if (type === 'rect') {
      tblWidth = ((qty - (qty %2 == 0 ? 2 : 1)) / 2) * 88
    }
    return {width: tblWidth + 'px'}
  }

  roundTableChairsData = (qty) => {
    switch (qty) {
      case 4:
        return [
          {id: '1', x: '60', y: '60'},
          {id: '2', x: '356', y: '60'},
          {id: '3', x: '60', y: '356'},
          {id: '4', x: '356', y: '356'},
        ]
      case 5:
        return [
          {id: '1', x: '208', y: '0'},
          {id: '2', x: '10', y: '145'},
          {id: '3', x: '407', y: '145'},
          {id: '4', x: '84', y: '375'},
          {id: '5', x: '334', y: '375'},
        ]
      case 6:
        return [
          {id: '1', x: '208', y: '0'},
          {id: '2', x: '26', y: '104'},
          {id: '3', x: '390', y: '104'},
          {id: '4', x: '26', y: '312'},
          {id: '5', x: '390', y: '312'},
          {id: '6', x: '208', y: '416'},
        ]
      case 7:
        return [
          {id: '1', x: '208', y: '0'},
          {id: '2', x: '48', y: '74'},
          {id: '3', x: '368', y: '74'},
          {id: '4', x: '3', y: '242'},
          {id: '5', x: '415', y: '242'},
          {id: '6', x: '96', y: '384'},
          {id: '7', x: '321', y: '384'},
        ]
      case 8:
        return [
          {id: '1', x: '208', y: '0'},
          {id: '2', x: '60', y: '60'},
          {id: '3', x: '356', y: '60'},
          {id: '4', x: '0', y: '208'},
          {id: '5', x: '416', y: '208'},
          {id: '6', x: '60', y: '356'},
          {id: '7', x: '356', y: '356'},
          {id: '8', x: '208', y: '416'},
        ]
      case 9:
        return [
          {id: '1', x: '208', y: '0'},
          {id: '2', x: '74', y: '50'},
          {id: '3', x: '344', y: '50'},
          {id: '4', x: '4', y: '172'},
          {id: '5', x: '413', y: '172'},
          {id: '6', x: '27', y: '312'},
          {id: '7', x: '390', y: '312'},
          {id: '8', x: '134', y: '402'},
          {id: '9', x: '283', y: '402'},
        ]
      case 10:
        return [
          {id: '1', x: '208', y: '0'},
          {id: '2', x: '84', y: '42'},
          {id: '3', x: '334', y: '42'},
          {id: '4', x: '10', y: '145'},
          {id: '5', x: '407', y: '145'},
          {id: '6', x: '10', y: '270'},
          {id: '7', x: '407', y: '270'},
          {id: '8', x: '84', y: '375'},
          {id: '9', x: '334', y: '375'},
          {id: '10', x: '208', y: '416'},
        ]
      case 11:
        return []
      case 12:
        return [
          {id: '1', x: '208', y: '0'},
          {id: '2', x: '104', y: '26'},
          {id: '3', x: '312', y: '26'},
          {id: '4', x: '26', y: '104'},
          {id: '5', x: '390', y: '104'},
          {id: '6', x: '0', y: '208'},
          {id: '7', x: '416', y: '208'},
          {id: '8', x: '26', y: '312'},
          {id: '9', x: '390', y: '312'},
          {id: '10', x: '104', y: '390'},
          {id: '11', x: '312', y: '390'},
          {id: '12', x: '208', y: '416'},
        ]
      default:
        return []
    }
  }

  roundTableChairs = (qty) => {
    const setup = this.roundTableChairsData(qty)
    return setup.map(chair => (
      <Chair key={chair.id} x={chair.x} y={chair.y} />
    ))
  }

  rectangleTableChairs = (qty) => {
    qty = (qty %2 == 0 ? qty : qty + 1)
    const chr = 66, buf = 4, sect = 88,
          num = (qty - 2) / 2,
          total = (chr + (buf * 2)) + (num * sect),
          chairs = []
    chairs.push(<Chair id='1' x='0' y='103' />)
    let id = 2, x = 81
    for (let i = num; i > 0; i--) {
      chairs.push(<Chair id={id} x={x} y='0' />)
      chairs.push(<Chair id={id + 1} x={x} y='206' />)
      id += 2
      x += 88
    }
    chairs.push(<Chair id={qty} x={total} y='103' />)
    return chairs
  }

  buildChairs = (tableType, qty) => {
    if (tableType === 'rnd') {
      return this.roundTableChairs(qty)
    }
    return this.rectangleTableChairs(qty)
  }

  render() {
    const type = this.props.tableType,
          qty = this.props.peopleQty,
          areaId = 'seating-area-' + type,
          areaWidth = this.calcAreaWidth(qty),
          tId = 'table-' + type,
          tSize = this.recommendedTableSize(type, qty),
          tStyle = this.tableStyle(type, qty)
    return (
      <div id={areaId} style={areaWidth}>
        <Table id={tId} size={tSize} style={tStyle}/>
        {this.buildChairs(type, qty)}
      </div>
    )
  }
}

export default SeatingArea
