import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './model/post.model';
import { PostsService } from './services/posts.service';
import { User } from './model/user.model'
import { UserService } from './services/user.service';
import { VraService } from './services/vra.service'

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  loadedUsers: User[] = [];
  deployments: any;
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(
    private http: HttpClient, 
    private postsService: PostsService,
    private userService: UserService,
    private vraService: VraService) {}

  ngOnInit() {
    // subject based way of passing error msg 
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });

    // this.vraService.getDeployments().subscribe(result => {
    //   console.log("Deployment Return: " + result);
    //   this.deployments = result;
    // })
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onGetsUsers() {
    this.userService.getUsers().subscribe(result => {
      this.loadedUsers = result;
    })
  }

}
