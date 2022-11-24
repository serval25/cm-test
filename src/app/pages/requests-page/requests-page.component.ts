import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ApproveModalComponent } from 'src/app/common/components/modals/approve-modal/approve-modal.component';
import { DeleteModalComponent } from 'src/app/common/components/modals/delete-modal/delete-modal.component';
import { DenyModalComponent } from 'src/app/common/components/modals/deny-modal/deny-modal.component';
import { MessageModalComponent } from 'src/app/common/components/modals/message-modal/message-modal.component';
import { RequestDTO, RequestorDTO } from 'src/app/common/data/interfaces/request-dto';

// mocks
// import { requestorsMock } from 'src/assets/mocks/json/requestors-mock';
// import { requestsMock } from 'src/assets/mocks/json/requests-mock';
// const requestors: {[key: string]: RequestorDTO} = requestorsMock;
// const ELEMENT_DATA: RequestDTO[] = requestsMock;

// pbs
const {
	ListRequestsRequest,
	GetRequestRequest,
	GetUserInfoRequest,
  } = require("src/app/common/data/backend/backend_pb.js");
const { BackendClient } = require("src/app/common/data/backend/backend_grpc_web_pb.js");




@Component({
	selector: 'requests-page',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
})
export class RequestPageComponent implements OnInit {
	public requestList = new ListRequestsRequest();
	// public dataSource = ELEMENT_DATA;
	public dataSource: RequestDTO[] = [];
	public requestIds: [] = [];
	public requestorIds: [] = [];
	public requestors: {[key: string]: RequestorDTO} = {};
	public client = new BackendClient(atob("aHR0cDovL21vY2suY2lwaGVybW9kZS5jb206NTAwNTE="), null, null);
	displayedColumns: string[] = ['checked', 'name', 'inputs', 'results', 'requestor', 'submitted'];
	constructor(
		private dialog: MatDialog,
		private cd: ChangeDetectorRef,
		private router: Router,
	) {}

	ngOnInit() {
		this.requestIds = [];
		this.client.listRequests(this.requestList, {}, (err: any, res: any) => {
			if (err) {
			  return;
			}
			this.requestIds = res.array[0];
			this.dataSource = this.getRequests (res.array[0]);
		});
	}

	ngAfterViewInit(): void {
		this.sortData();
	}

	public getRequests(ids: []) {
		var data: RequestDTO[] = [];
		var requestorsIds: string[] = [];
		ids.forEach((element: string) => {
			this.client.getRequest(
				new GetRequestRequest(element),
				{},
				(err: any, res: any) => {
				if (err) {
				}
				if (res) {
					data.push(
						{
							checked: false,
							id: element,
							name: res.array[0][0],
							inputs: res.array[0][1],
							results: res.array[0][2],
							requestorId: res.array[0][3],
							submittedTimestampUs: res.array[0][4],
							comment: res.array[0][5],
							status: res.array[0][6],
						}
					);
					if (requestorsIds.includes(res.array[0][3])) {
						// do nothing
					} else {
						this.getRequestorById(res.array[0][3]);
						requestorsIds.push(res.array[0][3]);
					}
				}
			}, )
		});
		return data;
	}

	public generateImage(b64string: string) {
		if (b64string !== undefined) {
			return 'data:image/png;base64, ' + b64string;
		}
		else {
			return 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='
		}
	}

	public getRequestor(key: string) {
		let requestor = <RequestorDTO>{};
		if (Object.keys(this.requestors).length === 0) {
			this.getRequestorById(key);
			return requestor; 
		} else if (this.requestors[key] !== undefined) {
			return this.requestors[key]
		} else {
			this.getRequestorById(key);
			return requestor;
		}
	}

	public getRequestorById(id: string) {
		this.client.getUserInfo(new GetUserInfoRequest(id), {}, (err: any, res: any) => {
			if (err) {
			}
			if (res) {
				this.requestors[id] = {
					name: res.array[0],
					profilePic: btoa(String.fromCharCode.apply(null, res.array[1])),
				}
			}
		});
	}

	public get isAllSelected(): boolean {
		return this.dataSource && this.dataSource.length === 0
			? false
			: this.dataSource.every((request: RequestDTO) => request.checked === true);
	}

	public get isSomeSelected(): boolean {
		return this.dataSource.every((request: RequestDTO) => request.checked !== true)
	}

	public toggleAll(isChecked: boolean): void {
		this.dataSource.forEach((request:RequestDTO) => (request.checked = isChecked));
	}

	public toggleElement(element: any, isChecked: boolean): void {
		element.checked = !element.checked;
	}

	public countSelected() {
		return this.dataSource.filter((element) => (element.checked === true)).length;
	}

	public getSelectedRequestor(datasource: RequestDTO[]) {
		let id = datasource.find((element : RequestDTO) => (element.checked === true))?.requestorId;
		if (id !== undefined) {
			return this.getRequestor(id)
		} else return null;
	}

	public sortData(sort?: Sort) {
		const data = this.dataSource.slice();
		if (sort) {
			if (!sort.active || sort.direction === '') {
				this.dataSource = data;
				return;
			}
			this.dataSource = data.sort((a, b) => {
				const isAsc = sort.direction === 'asc';
				return this.compare(a.submittedTimestampUs, b.submittedTimestampUs, isAsc);
			});
		} else return;
	}

	public compare(a: string, b: string, isAsc: boolean): number {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}

	public approve() {
		const dialogRef = this.dialog.open(ApproveModalComponent, {
			width: '640px',
			data: { 
				request: this.dataSource.find((element : RequestDTO) => (element.checked === true)),
				requestor: this.getSelectedRequestor(this.dataSource),
			},
		});
	}

	public deny() {
		const dialogRef = this.dialog.open(DenyModalComponent, {
			width: '640px',
			data: { request: this.dataSource.find(element => (element.checked === true)) },
		});
	}

	public needInfo() {
		const dialogRef = this.dialog.open(MessageModalComponent, {
			width: '640px',
			data: { request: this.dataSource.find(element => (element.checked === true)) },
		});
	}

	public delete() {
		const dialogRef = this.dialog.open(DeleteModalComponent, {
			width: '640px',
			data: { request: this.dataSource.find(element => (element.checked === true)) },
		});
	}

	public reload() {
		this.router.navigate(['/pages/requests']);
	}
}