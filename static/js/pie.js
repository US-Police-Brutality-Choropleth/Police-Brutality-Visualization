function optionChanged(plot){
  var plotImage = d3.select('.pie-plot')
  var plotHeading = d3.select('.plot-title')
  if (plot === 'Race Percentages') {
    plotImage.html("<img src ='static/Images/pie_plots/race_pie.png' width='700'>")
    plotHeading.text('Race Percentages Pie Chart')
  }
  else if (plot === 'Fleeing') {
    plotImage.html("<img src ='static/Images/pie_plots/flee_pie.png' width='700'>")
    plotHeading.text('Fleeing Percentages Pie Chart')
  }
  else if (plot === 'Armed/Unarmed') {
    plotImage.html("<img src ='static/Images/pie_plots/armed_unarmed_pie.png' width='700'>")
    plotHeading.text('Armed or Unarmed Pie Chart')
  }
  else {
    plotImage.html("<img src ='static/Images/pie_plots/year_pie.png' width='700'>")
    plotHeading.text('Data Per Year Pie Chart')
  }
}

var pie_plots = ['Race Percentages', 'Fleeing', 'Armed/Unarmed', 'Years']
d3.select('#selDataset')
  .selectAll('option')
  .data(pie_plots)
  .enter()
  .append('option')
  .text(plot => plot);