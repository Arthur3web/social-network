import React, { useState } from "react";
import { LikeOutlined, LikeFilled, MessageOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/ru";
import { rootStore } from "../../stores/RootStore";

moment.locale("ru");

interface CommentProps {
  id: string;
  author: {
    username: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
  comments?: CommentProps[];
}

const CustomComment: React.FC<CommentProps> = ({
  id,
  author,
  content,
  createdAt,
  likes: initialLikes,
  comments = [],
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleReply = () => {
    setIsReplying(true);
  };

  const submitReply = () => {
    if (!replyText.trim()) return;

    rootStore.addCommentPost(id, replyText);
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: 16,
        padding: 12,
        border: "1px solid #f0f0f0",
        borderRadius: 4,
      }}
    >
      <div style={{ marginRight: 12 }}>
        <img
          src={author.avatar || "https://i.pravatar.cc/150?img=3"}
          alt={author.username}
          style={{ width: 32, height: 32, borderRadius: "50%" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontWeight: "bold", marginRight: 8 }}>
            {author.username}
          </span>
          <span style={{ color: "#999", fontSize: 12 }}>
            {moment(createdAt).fromNow()}
          </span>
        </div>
        <div style={{ marginBottom: 8 }}>{content}</div>
        <div style={{ display: "flex", gap: 16 }}>
          <button
            onClick={handleLike}
            style={{
              display: "flex",
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: liked ? "#1890ff" : "#666",
            }}
          >
            {liked ? <LikeFilled /> : <LikeOutlined />}
            {likes > 0 && <span style={{ marginLeft: 4 }}>{likes}</span>}
          </button>
          <button
            onClick={handleReply}
            style={{
              display: "flex",
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#666",
            }}
          >
            <MessageOutlined />
            <span style={{ marginLeft: 4 }}>Прокомментировать</span>
          </button>
        </div>
        {isReplying && (
          <div style={{ marginTop: 12 }}>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                border: "1px solid #d9d9d9",
                borderRadius: 4,
                marginBottom: 8,
              }}
              rows={2}
              placeholder="Напишите ответ..."
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={submitReply}
                style={{
                  background: "#1890ff",
                  color: "white",
                  border: "none",
                  padding: "4px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Отправить
              </button>
              <button
                onClick={() => setIsReplying(false)}
                style={{
                  background: "none",
                  border: "1px solid #d9d9d9",
                  padding: "4px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        )}
        <div style={{ marginTop: 12 }}>
          {comments.map((comment) => (
            <CustomComment key={comment.id} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomComment;
