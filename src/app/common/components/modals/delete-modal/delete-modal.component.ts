import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// pbs
const { DeleteRequestRequest } = require("src/app/common/data/backend/backend_pb.js");
const { BackendClient } = require("src/app/common/data/backend/backend_grpc_web_pb.js");

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  public client = new BackendClient(atob("aHR0cDovL21vY2suY2lwaGVybW9kZS5jb206NTAwNTE="), null, null);

  constructor(
		public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
	) {}

  public confirm () {
    const req = new DeleteRequestRequest();
    req.setId(this.data.request.id);
    this.client.deleteRequest(req, {}, (err: any, res: any) => {
			this.cancel();
		});
  }

  public cancel () {
    this.dialogRef.close();
  }
}
