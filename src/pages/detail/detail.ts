import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SharedProvider, Global } from "../../providers/shared/shared";
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  private id: string;
  private topic: any;
  private accesstoken: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedProvider: SharedProvider) {
    this.id = navParams.get("id");
  }
  ngOnInit() {
    this.accesstoken = localStorage.getItem('accesstoken');
    this.topic = this.sharedProvider.httpGet(Global.API.getTopic + this.id, this.accesstoken ? { 'accesstoken': this.accesstoken } : null, true)
      .then(data => {
        this.topic = data.data;
      });
    console.log("topic:" + this.topic);
  }

  like(reply) {
    console.log("like++");
    this.sharedProvider.httpPost(Global.API.upReply.replace(':reply_id', reply.id), this.accesstoken ? { 'accesstoken': this.accesstoken } : null, false)
      .then(data => {
        if (data.success) {
          if (data.action == "down") {
            reply.is_uped = false;
            reply.ups.pop();
          } else {
            reply.is_uped = true;
            reply.ups.push('');
          }
        } else {

        }
      });
  }
}
