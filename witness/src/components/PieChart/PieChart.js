import React from 'react'
import { Pie } from 'react-chartjs-2';

const PieChart = ({ tables, witness}) => {
  return (
    <>
      <Pie
        data={{
          labels: [
            'Mesas por cubrir',
            'Testigos Inscritos',
          ],
          datasets: [{
            label: 'Testigos Electorales',
            data: [ tables, witness], //valores dinamicos mesas totales, testigos inscritos
            backgroundColor: [
              'rgb(242, 121, 149)',
              'rgb(25, 130, 234)',
            ],
            hoverOffset: 4
          }]
        }}
        height={400}
        width={400}
      />
    </>
  )
}

export default PieChart
