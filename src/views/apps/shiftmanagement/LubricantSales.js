import React from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { ContextLayout } from "../../../utility/context/Layout";
import { ChevronDown, Trash2, Eye, Edit } from "react-feather";
import axios from "axios";

import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";

import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

class LubricantSales extends React.Component {
  state = {
    rowData: null,
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "Lubricants Total Sale",
        field: "Lubricants Total Sale",
        filter: true,
        width: 250,
        pinned: window.innerWidth > 992 ? "left" : false,
      },
      {
        headerName: "Grade",
        field: "Grade",
        width: 175,
        filter: true,
        checkboxSelection: false,
        headerCheckboxSelectionFilteredOnly: false,
        headerCheckboxSelection: false,
      },
      {
        headerName: "Opening Stock",
        field: "opening stock",
        filter: true,
        width: 250,
      },

      {
        headerName: "Selling price",
        field: "selling price",
        filter: true,
        width: 175,
      },

      {
        headerName: "RSP",
        field: "RSP",
        filter: true,
        width: 250,
      },
      {
        headerName: "No of Pieces",
        field: "no of pieces",
        filter: true,
        width: 150,
      },
      {
        headerName: "Payment Mode",
        field: "payment mode",
        filter: true,
        width: 150,
      },
      {
        headerName: "DSM/Manager Name",
        field: "DSM/Manager name",
        filter: true,
        width: 125,
      },
      // {
      //   headerName: "Zip",
      //   field: "zip",
      //   filter: "agNumberColumnFilter",
      //   width: 140,
      // },
      // {
      //   headerName: "Mobille No.",
      //   field: "number",
      //   filter: "agNumberColumnFilter",
      //   width: 140,
      // },
      {
        headerName: "Joining Date.",
        field: "Joining Date",
        filter: "agNumberColumnFilter",
        width: 140,
      },
      {
        headerName: "Actions",
        field: "sortorder",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              <Eye
                className="mr-50"
                size="25px"
                color="green"
                // onClick={() =>
                // history.push(`/app/slider/viewSlider/${params.data._id}`)
                // }
              />
              <Edit
                className="mr-50"
                size="25px"
                color="blue"
                // onClick={() => history.push("/app/slider/editSlider/${params.data._id}")}
              />
              <Trash2
                className="mr-50"
                size="25px"
                color="red"
                onClick={() => {
                  let selectedData = this.gridApi.getSelectedRows();
                  this.runthisfunction(params.data._id);
                  this.gridApi.updateRowData({ remove: selectedData });
                }}
              />
            </div>
          );
        },
      },
    ],
  };

  componentDidMount() {
    axios.get("/api/aggrid/data").then((response) => {
      let rowData = response.data.data;
      JSON.stringify(rowData);
      this.setState({ rowData });
    });
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
    });
  };

  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Lubricants Sale"
          breadCrumbParent="Forms & Tables"
          breadCrumbActive="Lubricants Sale"
        />
        <Card className="overflow-hidden agGrid-card">
          <CardBody className="py-0">
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-2 ag-grid-table">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="mb-1">
                    <UncontrolledDropdown className="p-1 ag-dropdown">
                      <DropdownToggle tag="div">
                        {this.gridApi
                          ? this.state.currenPageSize
                          : "" * this.state.getPageSize -
                            (this.state.getPageSize - 1)}{" "}
                        -{" "}
                        {this.state.rowData.length -
                          this.state.currenPageSize * this.state.getPageSize >
                        0
                          ? this.state.currenPageSize * this.state.getPageSize
                          : this.state.rowData.length}{" "}
                        of {this.state.rowData.length}
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(134)}
                        >
                          134
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    <div className="table-input mr-1">
                      <Input
                        placeholder="search..."
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </div>
                    <div className="export-btn">
                      <Button.Ripple
                        color="primary"
                        onClick={() => this.gridApi.exportDataAsCsv()}
                      >
                        Export as CSV
                      </Button.Ripple>
                    </div>
                  </div>
                </div>
                <ContextLayout.Consumer>
                  {(context) => (
                    <AgGridReact
                      gridOptions={{}}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      colResizeDefault={"shift"}
                      animateRows={true}
                      floatingFilter={true}
                      pagination={true}
                      paginationPageSize={this.state.paginationPageSize}
                      pivotPanelShow="always"
                      enableRtl={context.state.direction === "rtl"}
                    />
                  )}
                </ContextLayout.Consumer>
              </div>
            )}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default LubricantSales;
