import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from '../model/post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  // use subject for trapping error when not subscribing
  error = new Subject<string>(); 

  constructor(private http: HttpClient) {}

  // firebase create post
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
    .post<{ name: string }>(
      'https://ac-http-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response' // get full response instead of <response>.message
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  // firebase fetch posts
  fetchPosts() {
    let searchParams = new HttpParams();
    // append search params
    searchParams = searchParams.append('print', 'pretty');
    return this.http
    .get<{ [key: string]: Post }>(
      'https://ac-http-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello'}),
        params: searchParams
      }
    )
    .pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        // Send to analytics servers as an example for using catchError
        return throwError(errorRes);
      })
    );
  }

  // firebase delete posts
  deletePosts() {
    return this.http.delete('https://ac-http-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }
    ).pipe(tap((event) => {
      console.log(event);
      // update UI with waiting for response
      if (event.type === HttpEventType.Sent) { 
        // ...
      }
      // update UI with complete
      if (event.type === HttpEventType.Response) { 
        console.log(event.body);
      }
    }))
  }

}