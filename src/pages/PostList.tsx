import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";

const PostList = () => {
  return (
    <>
      <div>Добавьте что-нибудь о себе или новенькое</div>
      {/* <input>введите текст</input> */}
    </>
  );
};

export default observer(PostList);
