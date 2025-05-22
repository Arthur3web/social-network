import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";
import { useState } from "react";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import CustomComment from "../components/navigation/CustomComment";

const PostList = observer(() => {
  const [newPostText, setNewPostText] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(
    null
  );
  const [commentText, setCommentText] = useState("");

  const handleAddPost = () => {
    if (newPostText.trim()) {
      rootStore.addPost(newPostText);
      setNewPostText("");
    }
  };

  const handleLikePost = (postId: string) => {
    rootStore.likePost(postId);
  };

  const handleAddComment = (postId: string) => {
    if (commentText.trim()) {
      rootStore.addCommentToPost(postId, commentText);
      setCommentText("");
      setActiveCommentPostId(null);
    }
  };

  return (
    <div>
      <h2>Добавьте что-нибудь о себе или новенькое...</h2>

      <div>
        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Введите текст поста"
          rows={5}
          style={{ width: "100%", padding: "8px", resize: "vertical" }}
        />
        <button onClick={handleAddPost}>Добавить пост</button>
      </div>

      {/* <div>
        <Input.TextArea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Введите текст поста"
          autoSize={{ minRows: 4, maxRows: 4 }}
          style={{ marginBottom: 16, background: "#222" }}
        />
        <Button type="primary" onClick={handleAddPost}>
          Добавить пост
        </Button>
      </div> */}

      <div>
        <h3>Список постов:</h3>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            padding: "10px",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 transparent",
          }}
        >
          {rootStore.posts.map((post) => (
            <div
              key={post.id}
              style={{
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                whiteSpace: "pre-line",
              }}
            >
              <p>{post.content}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <small>{new Date(post.createdAt).toLocaleString()}</small>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLikePost(post.id)}
                  >
                    <LikeOutlined />
                    <span>{post.likes || ""}</span>
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setActiveCommentPostId(
                        activeCommentPostId === post.id ? null : post.id
                      )
                    }
                  >
                    <CommentOutlined />
                  </span>
                </div>
              </div>

              {activeCommentPostId === post.id && (
                <div style={{ marginTop: "10px" }}>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Напишите комментарий..."
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "8px",
                      resize: "vertical",
                    }}
                  />
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "8px" }}
                  >
                    <button onClick={() => handleAddComment(post.id)}>
                      Отправить
                    </button>
                    <button onClick={() => setActiveCommentPostId(null)}>
                      Отмена
                    </button>
                  </div>
                </div>
              )}

              {post.comments && post.comments.length > 0 && (
                <div
                  style={{
                    marginTop: "16px",
                    borderLeft: "2px solid #eee",
                    paddingLeft: "10px",
                  }}
                >
                  {post.comments.map((comment) => (
                    <CustomComment likes={0} key={comment.id} {...comment} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default PostList;
