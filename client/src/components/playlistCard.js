

function PlaylistCard(props) {


    return (
        <div>
            <div>
                playlist uri: {props.playlistInfo.uri}
            </div>
            <div>
                playlist name: {props.playlistInfo.name}
            </div>
            <div>
                playlist id: {props.playlistInfo.id}
            </div>
            <div>
                playlist image: {props.playlistInfo.image}
            </div>
            <div>
                playlist description: {props.playlistInfo.description}
            </div>
            <div>
                playlist href: {props.playlistInfo.href}
            </div>
        </div>
    )
}

export default PlaylistCard