import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// pbs
const { UpdateRequestRequest, DataRequest } = require("src/app/common/data/backend/backend_pb.js");
const { BackendClient } = require("src/app/common/data/backend/backend_grpc_web_pb.js");

@Component({
  selector: 'app-approve-modal',
  templateUrl: './approve-modal.component.html',
  styleUrls: ['./approve-modal.component.scss']
})
export class ApproveModalComponent {
  public client = new BackendClient(atob("aHR0cDovL21vY2suY2lwaGVybW9kZS5jb206NTAwNTE="), null, null);

  constructor(
		public dialogRef: MatDialogRef<ApproveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
	) {}

  public approve () {
    const req = new UpdateRequestRequest();
    req.setOriginalRequest(this.setData(this.data.request));
    req.setNewRequest(this.setData(this.data.request, '0'));
    req.setId(this.data.request.id);
    this.client.updateRequest(req, {}, (err: any, res: any) => {
      this.cancel();
    });
  }

  public setData (data: any, newStatus?: string) {
    const dataset = new DataRequest();
    dataset.setInputsList(data.inputsList);
    dataset.setResults(data.results);
    dataset.setRequestorId(data.requestorId);
    dataset.setSubmittedTimestampUs(data.submittedTimestampUs);
    dataset.setCommentList(data.commentList);
    dataset.addComment(""); 
    dataset.setStatus(newStatus);
    dataset.setName(data.name);
    return dataset;
  }

  public cancel () {
    this.dialogRef.close();
  }
}
