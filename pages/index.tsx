import ChatBox from '../components/ChatBox';

const Home = () => {
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>ChatBot</h1>
            <div className='container'>
                <ChatBox user="User A" />
                <ChatBox user="User B" />
            </div></>
    );
};

export default Home;
