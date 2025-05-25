export default function Header({ email = "Loading..!", name = "Loading..!" }) {
    return (
        <div className="flex flex-col space-y-2 w-full justify-center items-start font-body">
            <div className="flex flex-wrap items-center">
                <h1 className="text-base sm:text-lg font-semibold text-primaryText font-header mr-2">Name:</h1>
                <span className="text-accent text-lg sm:text-xl font-medium break-words">{name}</span>
            </div>
            <div className="flex flex-wrap items-center">
                <h1 className="text-base sm:text-lg font-semibold text-primaryText font-header mr-2">Email:</h1>
                <span className="text-accent text-lg sm:text-xl font-medium break-words">{email}</span>
            </div>
        </div>
    );
}
