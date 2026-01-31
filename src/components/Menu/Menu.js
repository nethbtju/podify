import './Menu.css';

function Menu({ currentView, onSelect }) {
    const menuItems = [
        { id: 'tracks', label: 'Top Songs', icon: '♫' },
        { id: 'artists', label: 'Top Artists', icon: '★' },
        { id: 'albums', label: 'Top Albums', icon: '◉' },
    ];

    return (
        <div className="menu-list">
            {menuItems.map((item) => (
                <div 
                    key={item.id}
                    className={`menu-item ${currentView === item.id ? 'selected' : ''}`}
                    onClick={() => onSelect(item.id)}
                >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                    <span className="menu-arrow">›</span>
                </div>
            ))}
        </div>
    );
}

export default Menu;
