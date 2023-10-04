const gridOptions = {
    columnDefs: [
        { headerName: "Requested By", field: 'Requested_by', enableRowGroup: true },
        { headerName: "RequestID", field: 'RequestID' },
        { headerName: "Created", field: 'Created', enableRowGroup: true },
        { headerName: "Emp.Id", field: 'Emp_Id', maxWidth: 100 },
        { headerName: "Request for", field: 'Request_for', enableRowGroup: true, minWidth: 300 },
        { headerName: "Amount", field: 'Amount', maxWidth: 150 },
        { headerName: "Status", field: 'Status', enableRowGroup: true, minWidth: 300 },
        { headerName: "PendingWith", field: 'PendingWith', enableRowGroup: true },
        { headerName: "View/Action", field: 'View_Action', cellRenderer: viewActionCellRenderer, maxWidth: 150 },
    ],
    defaultColDef: {
        sortable: true,
        resizable: true,
    },
    animateRows: true,
    rowGroupPanelShow: 'always',
    flex: 1,
    minWidth: 100,

    paginationPageSize: 5,
    suppressRowClickSelection: true,
    groupSelectsChildren: true,
    rowSelection: 'multiple',
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    pagination: true,
};


function onFilterTextBoxChanged() {
    gridOptions.api.setQuickFilter(
        document.getElementById('filter-text-box').value
    );
}

function onBtExport() {
    gridOptions.api.exportDataAsExcel();
}

function viewActionCellRenderer(params) {
    if (params.value === undefined) return null;
    return LinkRanderer(params, 'View');
}

document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    fetch('http://127.0.0.1:5500/reimbursementData.json')
        .then((response) => response.json())
        .then((data) => gridOptions.api.setRowData(
            data.map((item) => {
                return {
                    ...item,
                    Created: new Date(item.Created),
                }
            })
        ));
});

function LinkRanderer(params, label) {
    const viewActionValue = `?id=${params.value}`;

    const linkElement = document.createElement('a');
    linkElement.href = viewActionValue;
    linkElement.textContent = label;

    linkElement.addEventListener('click', (event) => {
        event.preventDefault();
        window.open(viewActionValue, '_blank');
    });

    return linkElement;
}