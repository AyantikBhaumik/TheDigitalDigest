import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  return (
    postInfo && (
      <div className="post-page">
        <h1>{postInfo.title}</h1>
        <time>
          {format(new Date(postInfo.createdAt), "d MMM, yyyy HH:mm:ss")}
        </time>
        <div className="author">by @{postInfo.author.username}</div>
        <div className="image">
          <img src={`http://localhost:4000/${postInfo.cover}`} />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    )
  );
}

export default PostPage;
