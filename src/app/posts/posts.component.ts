import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './../service/api-service.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;
  allPosts: any;
  pageNo = 0;
  recordPerPage = 10;
  totalPages: number;
  constructor(public _apiService: ApiServiceService) { }

  ngOnInit() {
    this._apiService.getAllPostData().subscribe((res: any) => {
      console.log(res);
      this.allPosts = res;
      this.totalPages = Math.ceil((res.length || 0) / this.recordPerPage);
      this.paginate(res);
    });
  }

  paginate(data) {
      data = JSON.parse(JSON.stringify(data));
      const startRec = this.pageNo * this.recordPerPage;
      const endRec = startRec + this.recordPerPage;
      this.posts = _.slice(data, startRec, endRec);
      }

  next() {
      ++this.pageNo;
      this.paginate(this.allPosts);
  }
  previous() {
      --this.pageNo;
      this.paginate(this.allPosts);
  }

}
