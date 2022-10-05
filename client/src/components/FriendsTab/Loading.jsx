import Skeleton from '@mui/material/Skeleton';

const Loading = () => {
    return (
        <div className="Loading">
            <Skeleton variant="rounded" height={60} />
            <Skeleton variant="circular" height={40} width={40} />
            <Skeleton variant="rounded" height={20} />
        </div>
    );
}

export default Loading;