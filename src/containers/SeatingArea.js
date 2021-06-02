import React from 'react'
import Chair from '../components/things/Chair'
import Table from '../components/things/Table'

class SeatingArea extends React.Component {

  recommendedTableSize = (tableType, qty) => {
    if (tableType === 'rnd') {
      switch (qty) {
        case 1:
        case 2:
        case 3:
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
    const feet = qty - (qty %2 === 0 ? 2 : 1)
    const meters = Math.round(feet * .3048 * 100) / 100
    switch (qty) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        return '3 ft | 36 in'
      default:
        return `${feet} ft | ${feet * 12} in | ${meters} m`
    }
  }

  calcTableWidth = (type, qty) => {
    let width = 322
    if (type === 'rect') {
      if (qty < 5) {
        width = 132
      } else {
        width = ((qty - (qty %2 === 0 ? 2 : 1)) / 2) * 88
      }
    }
    return width
  }

  calcAreaWidth = (type, qty) => {
    const tableWidth = this.calcTableWidth(type, qty)
    const chairsWidth = 70 * 2
    return {width: tableWidth + chairsWidth + 'px'}
  }

  tableStyle = (type, qty) => {
    const tableWidth = this.calcTableWidth(type, qty)
    return {width: tableWidth + 'px'}
  }

  roundTableChairsData = (qty) => {
    switch (qty) {
      case 4:
        return [
          {id: '1', x: '198', y: '0'},
          {id: '2', x: '0', y: '198'},
          {id: '3', x: '396', y: '198'},
          {id: '4', x: '198', y: '396'}
        ]
      case 5:
        return [
          {id: '1', x: '198', y: '0'},
          {id: '2', x: '9', y: '136'},
          {id: '3', x: '387', y: '136'},
          {id: '4', x: '81', y: '359'},
          {id: '5', x: '314', y: '359'}
        ]
      case 6:
        return [
          {id: '1', x: '198', y: '0'},
          {id: '2', x: '26', y: '99'},
          {id: '3', x: '370', y: '99'},
          {id: '4', x: '26', y: '297'},
          {id: '5', x: '370', y: '297'},
          {id: '6', x: '198', y: '396'}
        ]
      case 7:
        return [
          {id: '1', x: '198', y: '0'},
          {id: '2', x: '41', y: '76'},
          {id: '3', x: '355', y: '76'},
          {id: '4', x: '5', y: '244'},
          {id: '5', x: '391', y: '244'},
          {id: '6', x: '111', y: '377'},
          {id: '7', x: '285', y: '377'}
        ]
      case 8:
        return [
          {id: '1', x: '198', y: '0'},
          {id: '2', x: '58', y: '58'},
          {id: '3', x: '338', y: '58'},
          {id: '4', x: '0', y: '198'},
          {id: '5', x: '396', y: '198'},
          {id: '6', x: '58', y: '338'},
          {id: '7', x: '338', y: '338'},
          {id: '8', x: '198', y: '396'}
        ]
      case 9:
        return [
          {id: '1', x: '198', y: '0'},
          {id: '2', x: '70', y: '46'},
          {id: '3', x: '325', y: '46'},
          {id: '4', x: '4', y: '162'},
          {id: '5', x: '392', y: '162'},
          {id: '6', x: '26', y: '298'},
          {id: '7', x: '370', y: '298'},
          {id: '8', x: '130', y: '385'},
          {id: '9', x: '268', y: '385'}
        ]
      case 10:
        return [
          {id: '1', x: '198', y: '0'},
          {id: '2', x: '81', y: '37'},
          {id: '3', x: '314', y: '37'},
          {id: '4', x: '9', y: '136'},
          {id: '5', x: '387', y: '136'},
          {id: '6', x: '9', y: '260'},
          {id: '7', x: '387', y: '260'},
          {id: '8', x: '81', y: '359'},
          {id: '9', x: '314', y: '359'},
          {id: '10', x: '198', y: '396'}
        ]
      case 11:
        return [
          {id: '1', x: '198', y: '0'},
          {id: '2', x: '90', y: '32'},
          {id: '3', x: '306', y: '32'},
          {id: '4', x: '18', y: '115'},
          {id: '5', x: '378', y: '115'},
          {id: '6', x: '2', y: '226'},
          {id: '7', x: '394', y: '226'},
          {id: '8', x: '47', y: '328'},
          {id: '9', x: '349', y: '328'},
          {id: '10', x: '140', y: '388'},
          {id: '11', x: '255', y: '388'}
        ]
      case 12:
        return [
          {id: '1', x: '198', y: '0'},
          {id: '2', x: '99', y: '26'},
          {id: '3', x: '297', y: '26'},
          {id: '4', x: '26', y: '99'},
          {id: '5', x: '370', y: '99'},
          {id: '6', x: '0', y: '198'},
          {id: '7', x: '396', y: '198'},
          {id: '8', x: '26', y: '297'},
          {id: '9', x: '370', y: '297'},
          {id: '10', x: '99', y: '370'},
          {id: '11', x: '297', y: '370'},
          {id: '12', x: '198', y: '396'}
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
    const chairs = []
    if (qty === 0) {
      return chairs
    }
    qty = (qty %2 === 0 ? qty : qty + 1)
    const chr = 66, buf = 4, sect = 88,
          num = (qty - 2) / 2,
          total = (chr + (buf * 2)) + (num * sect)
    chairs.push(<Chair key='0' id='0' x='0' y='103' />)
    if (qty < 5) {
      chairs.push(<Chair key='1' id='1' x='103' y='0' />)
      chairs.push(<Chair key='2' id='2' x='206' y='103' />)
      chairs.push(<Chair key='3' id='3' x='103' y='206' />)
    } else {
      let id = 1, x = -7
      for (let i = num; i > 0; i--) {
        x += 88
        chairs.push(<Chair key={id} id={id} x={x} y='0' />)
        id += 1
      }
      chairs.push(<Chair key={id} id={id} x={total} y='103' />)
      id += 1
      for (let i = num; i > 0; i--) {
        chairs.push(<Chair key={id} id={id} x={x} y='206' />)
        id += 1
        x -= 88
      }
    }
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
          qty = this.props.chairQty,
          areaId = 'seating-area-' + type,
          areaWidth = this.calcAreaWidth(type, qty),
          tId = 'table-' + type,
          tSizeA = this.recommendedTableSize(type, qty),
          tSizeB = (tSizeA === '3 ft | 36 in' ? '.91 m' : ''),
          tStyle = this.tableStyle(type, qty)
    return (
      <div id={areaId} style={areaWidth}>
        <Table id={tId} sizeA={tSizeA} sizeB={tSizeB} style={tStyle}/>
        {this.buildChairs(type, qty)}
      </div>
    )
  }
}

export default SeatingArea
