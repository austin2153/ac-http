import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from '../model/post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
    .post<{ name: string }>(
      'https://ac-http-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    // append search params
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key'); // test, not valid 
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

  deletePosts() {
    return this.http.delete('https://ac-http-default-rtdb.firebaseio.com/posts.json');
  }

  // getVraAuthToken() {
  //   return this.http
  //   .get<{ [key: string]: Post }>('https://ybxd2fcavra0001.onefiserv.net/csp/gateway/am/api/login?access_token'),
  //   catchError(errorRes => {
  //     return throwError(errorRes);
  //   })
  // }

}