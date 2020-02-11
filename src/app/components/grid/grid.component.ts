import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef } from 'ag-grid-community';
import { CentralRxJsService } from '../../services/centralRXJS.service';
import { SenderRXJS } from '../../models/senderRXJS.interface';
import { config } from '../../services/config';
import { DataService } from '../../services/data.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalCadastroComponent } from '../modal-cadastro/modal-cadastro.component';
import { ModalEdicaoComponent } from '../modal-edicao/modal-edicao.component';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ArtigosInterface } from '../../models/artigo.interface';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
  public gridApi: GridApi;
  public gridOptions: GridOptions;
  public gridColumnApi: ColumnApi;
  grid = {
    Api: null as GridApi,
    Options: null as GridOptions,
    ColumnApi: null as ColumnApi,
  };
  columnDefs: ColDef[] = [];
  @Input() hasControl: boolean;
  @Input() itemsPerPage: number;
  @Input() data: ArtigosInterface[];
  filtro = '';
  isGridReady = false;
  allowEdit = false;
  selectedRows = [];
  constructor(
    private datasrv: DataService,
    public dialog: MatDialog,
    private centralRXJS: CentralRxJsService,
    private toastSrv: ToastService
  ) { }

  ngOnInit() {
    this.startGrid();
    window.onresize = ((resizeObj) => {
      this.gridApi.sizeColumnsToFit();
    });
    this.centralRXJS.DataToReceive.subscribe((res) => {
      switch (res.key) {
        case config.rxjsCentralKeys.ChangeToWeb:
          break;
        case config.rxjsCentralKeys.onGridFilter:
          this.filtro = res.data;
          this.gridApi.onFilterChanged();
          break;

      }

    });
  }


  startFilter(ev) {
    console.log(ev);
    this.gridApi.onFilterChanged();
  }

  ngOnChanges(changes) {
    // console.log('tive mudanças', changes.data.previousValue);
    if (changes.data.previousValue !== undefined) {
      this.gridOptions.api.setRowData(this.data);
      this.gridOptions.api.sizeColumnsToFit();
    }
  }

  startGrid() {
    this.gridOptions = {
      columnDefs: this.createColumnDefs,
      defaultColDef: {
        editable: false,
        sortable: true,
        resizable: true,
        filter: true,
      },
      suppressHorizontalScroll: false,
      overlayNoRowsTemplate: `
      <span class="ag-overlay-loading-center">Sem dados para exibir</span>
      `,
      overlayLoadingTemplate: `<span">carregando dados</span>`,
      suppressPaginationPanel: true,
      /* pagination: true, */
      rowSelection: 'multiple',
      onSelectionChanged: ((params) => {
        this.onCheckBoxSelection(params);
      }),
      onRowDoubleClicked: ((params) => {
        this.onRowSelect(params);
      }),
      rowHeight: 100,
      /* angularCompileRows: true, */
      isExternalFilterPresent: this.externalFilterPresent.bind(this),
      doesExternalFilterPass: this.externalFilterPass.bind(this),
      paginationPageSize: this.itemsPerPage,
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        /*         this.GridPage.current = this.gridApi.paginationGetCurrentPage();
                this.GridPage.total = this.gridApi.paginationGetTotalPages(); */
        // this.gridApi.paginationSetPageSize(Number(50));
      }
    };
  }
  onCheckBoxSelection(params) {
    console.log(params);
    console.log('selecionando items da linha 95', params);
    this.selectedRows = this.gridApi.getSelectedRows();
    console.log('dados da linha', this.selectedRows);
    console.log((this.selectedRows.length === 1));

    if (this.selectedRows.length === 1) {
      this.allowEdit = true;
    } else {
      this.allowEdit = false;
    }
  }

  get createColumnDefs(): Array<ColDef> {
    return this.columnDefs = [
      {
        headerName: 'titulo'.toLocaleUpperCase(),
        field: 'titulo',
        width: 30,
        checkboxSelection: ((params) => {
          return params.columnApi.getRowGroupColumns().length === 0;
        }),
        headerCheckboxSelection: ((params) => {
          return params.columnApi.getRowGroupColumns().length === 0;
        })
      },
      {
        headerName: 'autor'.toLocaleUpperCase(),
        field: 'autor',
        width: 15,
        autoHeight: true,
      },
      {
        headerName: 'data'.toLocaleUpperCase(),
        field: 'data',
        cellRenderer: ((params) => {

          const dia = new Date(params.data.data).getDate()
          const mes = new Date(params.data.data).getMonth() + 1
          const ano = new Date(params.data.data).getFullYear()
          const dataTotal = dia + '/' + mes + '/' + ano;
          const retornoComentario = `
          <span style="text-overflow: ellipsis">
          `
          +
          dataTotal
          +
          `
          </span>
          `
          return retornoComentario;
        }),
        width: 5

      },
      {
        headerName: 'Ultima Atualização'.toLocaleUpperCase(),
        field: 'dataHoraAtualizacao',
        cellRenderer: ((params) => {

          const dia = new Date(params.data.dataHoraAtualizacao).getDate()
          const mes = new Date(params.data.dataHoraAtualizacao).getMonth() + 1
          const ano = new Date(params.data.dataHoraAtualizacao).getFullYear()
          const dataTotal = dia + '/' + mes + '/' + ano;
          const retornoComentario = `
          <span style="text-overflow: ellipsis">
          `
          +
          dataTotal
          +
          `
          </span>
          `
          return retornoComentario;
        }),
        width: 10,
        autoHeight: true,
      },
      {
        headerName: 'Comentario'.toLocaleUpperCase(),
        field: 'comentario',
        width: 10,
        autoHeight: true,
        cellRenderer: ((params) => {
          const retornoComentario = `
          <span style="text-overflow: ellipsis">
          `
          +
          params.data.comentario
          +
          `
          </span>
          `
          return retornoComentario;
        })
      },
      {
        headerName: 'Sugestao de Comentario'.toLocaleUpperCase(),
        field: 'sugestaoComentario',
        width: 10,
        autoHeight: true,
      },
      {
        headerName: 'ID',
        field: 'idArtigo',
        maxWidth: 0,
        hide: true
      },
    ];
  }
  externalFilterPresent() {
    return this.filtro !== '';
  }
  externalFilterPass(node: any) {
    if (this.filtro !== '') {
      if (
        ((node.data.titulo + '').toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1)
        ||
        ((node.data.autor + '').toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1)
        ||
        ((node.data.sugestaoComentario + '').toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1)
        ||
        ((node.data.comentario + '').toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1)
        ||
        ((node.data.data + '').toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1)
      ) {
        return true;
      }
    } else {
      return false;
    }
    return false;
  }
  onRowSelect(ev) {
    console.log('quantos foram selecionandos', ev);
    this.editItem(ev.data);

  }

  addNewItem(data?): void {
    const dialogRef = this.dialog.open(ModalCadastroComponent, {
      minWidth: '250px',
      data: ((data) ? data : null)
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  editItem(rowData?) {
    if (rowData === undefined) {
      rowData = this.selectedRows[0]
    }
    const dialogRef = this.dialog.open(ModalEdicaoComponent, {
      minWidth: '250px',
      data: rowData
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  deleteItem() {
    const toastConfig: SweetAlertOptions = {
      title: 'Tem certeza',
      text: 'Não será possivel reverter esta ação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete-os!'
    }
    this.toastSrv.showConfirmDialog(toastConfig).then((result) => {
      if (result.value) {
       this.datasrv.deleteFromDB = this.selectedRows;
       /* this.toastSrv.showToast()  */
      Swal.fire(
          'Deletados',
          'Arquivos selecionados foram deletados',
          'success'
        )}
    })
 /*    Swal.fire().then((result) => {
      if (result.value) {
        this.datasrv.deleteFromDB = this.selectedRows;
        Swal.fire(
          'Deletados',
          'Arquivos selecionados foram deletados',
          'success'
        )
      }
    }) */



  }

}
