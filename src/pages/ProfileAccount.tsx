import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";

const ProfileAccount = () => {
  return (
    <>
      <div>HELLO</div>
      {rootStore.currentUser && (
        <>
          <div>{rootStore.currentUser.username}</div>
          <div>
            <img
              src={rootStore.currentUser.avatar}
              alt="User avatar"
              width={100}
              height={100}
            />
          </div>
        </>
      )}
    </>
  );
};

export default observer(ProfileAccount);
