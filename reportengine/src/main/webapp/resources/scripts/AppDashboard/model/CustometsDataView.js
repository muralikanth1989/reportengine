
Ext.define('AppDashboard.model.CustometsDataView', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'ClientCode',  type: 'string'},
        {name: 'ClientName',   type: 'string'},
        {name: 'CostCenterCode', type: 'string'},
        {name: 'CostCenterName', type: 'string'},
        {name: 'IntroBy', type: 'string'},
        {name: 'SubBrokerName', type: 'string'},
        {name: 'PanNo', type: 'string'},
        {name: 'MobileNumber', type: 'int'},
        {name: 'EmailID', type: 'string'},
        {name: 'SchemeCode', type: 'string'},
        {name: 'SchemeName', type: 'string'},
        {name: 'DateOfJoin', type: 'date', dateFormat:'m/d/Y'}
    ],
    
});