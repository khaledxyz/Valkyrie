import Skeleton from '@mui/material/Skeleton';

const Loading = () => {
    const parent = {
        position: 'relative',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',

        width: '100%',
        height: '60px',
        borderRadius: '5px',
    };

    const bg = {
        position: 'absolute',

        width: '100%',
        height: '100%',
    };

    const avatar = {
        marginLeft: '10px'
    };

    const name = {
        width: '120px',
        marginLeft: '10px'
    }
    return (
        <div style={parent}>
            <Skeleton sx={bg} variant='rounded' height={60}></Skeleton>
            <Skeleton sx={avatar} variant='circular' height={40} width={40} />
            <Skeleton sx={name} variant='rounded' height={20} />
        </div>
    );
}

export default Loading;