
Ext.define('AppDashboard.view.TotalVolumeByBarChart', {
	extend: 'Ext.chart.Chart',
	alias:'widget.totalvolumebybarchart',
	
    animate: true,
    store: new Ext.data.Store({
    	fields: ['SYMBOL', 'Volume'],
    	data : []
	}),
	 width: 500,
	 height: 500,
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['Volume'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Total Volume by date',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'left',
        fields: ['SYMBOL'],
        title: 'SYMBOL'
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
            this.setTitle(storeItem.get('SYMBOL') + ': ' + storeItem.get('Volume') + ' Volumes');
          }
        },
        label: {
        	display: 'insideEnd',
            field: 'Volume',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#FFF',
            'text-anchor': 'middle'
        },
        xField: 'SYMBOL',
        yField: 'Volume',
        renderer: function(sprite, record, attr, index, store) {
        	console.log(sprite);
            return Ext.apply(attr, {
                fill: '#E7E7E7' //#B3B7BD #a62011 4B5056 #5E6F83
            });
        }
    }]
});