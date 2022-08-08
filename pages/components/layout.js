export default function Layout({ children }) {
    return (
            <div>
                <header>Books</header>
                <main>{children}</main>
            </div>
        );
}