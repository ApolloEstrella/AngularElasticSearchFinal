import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {

  }
  value = 'Clear me';
  results: any;
  

  onLoadData() {

    //this.value = encodeURIComponent(this.value);

    var url = "http://localhost:9200/starindex01/_doc/_search?q=*" + this.value + "*+AND+is_deleted:0";
   //   alert(url);
   //this.httpClient.get('http://localhost:9200/starindex01/_doc/_search?q=user_name:*' + this.value + '*+AND+is_deleted:0')

    this.httpClient.get(url)
      .subscribe((data: any[]) => {
        this.results = data['hits']['hits'].map(function (i) {
          return i['_source'];
          //console.log(this.results);"
        });
      }, (error: Response) => {
          if (error.status === 400) {
            // now let's imagine the general alert message. Let's image we've a form  
            // And in Reactive form article, we see how form object works in applicaton.  
            // if it exists.  
            alert(error.statusText);    // We know that it will not compile here.  
          }
          else {
            alert('An Unexpected Error Occurred.');
            console.log(error);
          }
      });
  }
}




