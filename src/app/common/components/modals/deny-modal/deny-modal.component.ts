import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// pbs
const { UpdateRequestRequest, DataRequest } = require("src/app/common/data/backend/backend_pb.js");
const { BackendClient } = require("src/app/common/data/backend/backend_grpc_web_pb.js");

@Component({
  selector: 'app-deny-modal',
  templateUrl: './deny-modal.component.html',
  styleUrls: ['./deny-modal.component.scss']
})
export class DenyModalComponent {
  public msg: string = "";
  public client = new BackendClient(atob("aHR0cDovL21vY2suY2lwaGVybW9kZS5jb206NTAwNTE="), null, null);

  constructor(
		public dialogRef: MatDialogRef<DenyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
	) {}

  public submit () {
    const req = new UpdateRequestRequest();
    req.setOriginalRequest(this.setData(this.data.request));
    req.setNewRequest(this.setData(this.data.request, '1', this.msg.replaceAll(/(<([^>]+)>)/gi, "").substring(0, 2000)));
    req.setId(this.data.request.id);
    this.client.updateRequest(req, {}, (err: any, res: any) => {
      this.cancel();
    });
  }

  public changeText(event: any) {
    this.msg = event.target.value;
  }

  public setData (data: any, newStatus?: string, message?: string) {
    const dataset = new DataRequest();
    dataset.setInputsList(data.inputsList);
    dataset.setResults(data.results);
    dataset.setRequestorId(data.requestorId);
    dataset.setSubmittedTimestampUs(data.submittedTimestampUs);
    dataset.setCommentList(data.commentList);
    dataset.addComment(message); 
    dataset.setStatus(newStatus);
    dataset.setName(data.name);
    return dataset;
  }

  public cancel () {
    this.dialogRef.close();
  }
}
