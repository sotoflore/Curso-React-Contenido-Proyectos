interface Props {
    children: React.ReactNode;
}

const Card = ({ children }: Props) => {
    return (
        <div className="card mb-3">
            <div className="card-body">{children}</div>
        </div>
    );
};
export default Card;