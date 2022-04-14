export default function Join(props) {
    return (
        <>
            <h3>Meet other people Now!</h3>
            <div className="form-container">
                <form onSubmit={props.joinRoom}>
                    <label htmlFor="name-input">Choose Your Name</label>
                    <input
                        type="text"
                        id='name-input'
                        placeholder='Whats your name?'
                        onChange={props.user}
                    />
                    <label htmlFor="room-input">Room ID</label>
                    <input
                        type="text"
                        id='room-input'
                        placeholder='Type a Room ID'
                        onChange={props.room}
                    />
                    <button>Go Chat!</button>
                </form>
            </div>
        </>
    )
}