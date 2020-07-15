import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN_STATE } from '../redux/storeConstants';
import { logout } from '../redux/actions';
import Navigation from '../components/Navigation';
import DiscussionThreadFeed from '../components/DiscussionThreadFeed';
import ThreadView from '../components/ThreadView';
import LoginModal from '../components/LoginModal';

const useUpdateLoginState = (loginState, openLoginModal, setOpenLoginModal) => {
    const dispatch = useDispatch();

    if ((loginState === LOGIN_STATE.INVALID_LOGIN 
        || loginState === LOGIN_STATE.NETWORK_ERROR) && 
        (openLoginModal === false)) {
            dispatch(logout());
    }
    if (loginState === LOGIN_STATE.LOGGED_IN && openLoginModal === true) {
        setOpenLoginModal(false);
    }
}

const App = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [selectedThread, setSelectedThread] = useState({});
    const [createNewThread, setCreateNewThread] = useState(false);

    const loginState = useSelector(state => state.login.loginState);

    useUpdateLoginState(loginState, openLoginModal, setOpenLoginModal);

    return (
        <>
            <Navigation loginState={loginState}
                        setOpenLoginModal={setOpenLoginModal} />
            <DiscussionThreadFeed loginState={loginState} 
                                  selectedThread={selectedThread}
                                  setSelectedThread={setSelectedThread} 
                                  createNewThread={createNewThread}
                                  setCreateNewThread={setCreateNewThread} />
            <ThreadView selectedThread={selectedThread} 
                        createNewThread={createNewThread}/>
            <LoginModal openLoginModal={openLoginModal}
                        setOpenLoginModal={setOpenLoginModal} />
        </>
    );
}

export default App;
