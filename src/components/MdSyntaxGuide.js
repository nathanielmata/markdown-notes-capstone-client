import React from "react";

const MdSyntaxGuide = () => {
  return (
    <div className="how__to--syntax">
        <div>
          <h3>Heading</h3>
          <div>
            <code>
              # H1<br/>
              ## H2<br/>
              ### H3
            </code>
          </div>
        </div>
        <div>
          <h3>Bold</h3>
          <div><code>**bold text**</code></div>
        </div>
        <div>
          <h3>Italic</h3>
          <div><code>*italicized text*</code></div>
        </div>
        <div>
          <h3>Unordered List</h3>
          <div>
            <code>
              - First item<br/>
              - Second item<br/>
              - Third item<br/>
            </code>
          </div>
        </div>
        <div>
          <h3>Fenced Code Block</h3>
          <div>
            <code>
              ```<br/>
              {"{"}<br/>
              &nbsp;&nbsp;"firstName": "John",<br/>
              &nbsp;&nbsp;"lastName": "Smith",<br/>
              &nbsp;&nbsp;"age": 25<br/>
              {"}"}<br/>
              ```
            </code>
          </div>
        </div>
        <div>
          <h3>Link</h3>
          <div><code>[title](https://www.example.com)</code></div>
        </div>
        <div>
          <h3>Image</h3>
          <div><code>![alt text](image.jpg)</code></div>
        </div>
    </div>
  );
}

export default MdSyntaxGuide;