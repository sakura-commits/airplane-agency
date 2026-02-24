import { useState } from 'react';
import { Navbar } from "../Components/Navbar";
import { Notification } from "../Components/Notification";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faPlus,
  faTrash,
  faEdit,
  faCheckCircle,
  faMoneyBill,
  faMobile,
  faCalendarAlt,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import {
  faCcPaypal,
  faApplePay,
  faGooglePay,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover
} from '@fortawesome/free-brands-svg-icons';
import '../App.css';

export function PaymentMethods() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [clickedAction, setClickedAction] = useState({ id: null, action: null });
  const [toast, setToast] = useState({ show: false, message: '', cardId: null, timer: null });
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiry: '05/25',
      holderName: 'John Doe',
      isDefault: true,
      brand: 'Visa'
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiry: '12/24',
      holderName: 'John Doe',
      isDefault: false,
      brand: 'Mastercard'
    }
  ]);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    holderName: '',
    expiry: '',
    cvv: '',
    setAsDefault: false
  });

  const getCardIcon = (type) => {
    switch(type) {
      case 'visa':
        return faCcVisa;
      case 'mastercard':
        return faCcMastercard;
      case 'amex':
        return faCcAmex;
      case 'discover':
        return faCcDiscover;
      default:
        return faCreditCard;
    }
  };

  const getCardColor = (type) => {
    switch(type) {
      case 'visa':
        return '#1A1F71';
      case 'mastercard':
        return '#FF5F00';
      case 'amex':
        return '#006FCF';
      default:
        return '#133a94';
    }
  };

  const handleSetDefault = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
    // Show floating feedback
    setClickedAction({ id: cardId, action: 'default' });
    setTimeout(() => setClickedAction({ id: null, action: null }), 1500);
  };

  const handleDeleteCard = (cardId) => {
    // Visual feedback on button
    setClickedAction({ id: cardId, action: 'delete' });
    
    // Remove the card after brief animation
    setTimeout(() => {
      // Show undo toast
      const deletedCard = cards.find(card => card.id === cardId);
      setCards(cards.filter(card => card.id !== cardId));
      setClickedAction({ id: null, action: null });
      
      setToast({ 
        show: true, 
        message: `Card ending in ${deletedCard.last4} removed`, 
        cardId,
        timer: null
      });
      
      // Auto-hide toast after 5 seconds
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', cardId: null, timer: null });
      }, 5000);
      
      setToast(prev => ({ ...prev, timer }));
    }, 300);
  };

  const handleUndo = () => {
    if (toast.timer) clearTimeout(toast.timer);
    setToast({ show: false, message: '', cardId: null, timer: null });
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    // Validate and add card logic here
    const newCardData = {
      id: cards.length + 1,
      type: 'visa', // This would be detected from card number
      last4: newCard.cardNumber.slice(-4),
      expiry: newCard.expiry,
      holderName: newCard.holderName,
      isDefault: newCard.setAsDefault || cards.length === 0,
      brand: 'Visa'
    };

    setCards([...cards, newCardData]);
    setShowAddCard(false);
    setNewCard({
      cardNumber: '',
      holderName: '',
      expiry: '',
      cvv: '',
      setAsDefault: false
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <>
      <Navbar />
      <Notification 
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ ...notification, show: false })}
      />
      <div className="payment-page">
        <div className="payment-header">
          <h1>Payment Methods</h1>
          <p className="subtitle">Manage your payment options for faster checkout</p>
        </div>

        <div className="payment-container">
          {/* Saved Cards Section */}
          <div className="saved-cards-section">
            <div className="section-header">
              <h2>Saved Payment Methods</h2>
              <button
                className="add-card-btn"
                onClick={() => setShowAddCard(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add New Card
              </button>
            </div>

            <div className="cards-grid">
              {cards.map(card => (
                <div key={card.id} className={`card-item ${card.isDefault ? 'default' : ''}`}>
                  <div className="card-header">
                    <FontAwesomeIcon
                      icon={getCardIcon(card.type)}
                      className="card-icon"
                      style={{ color: getCardColor(card.type) }}
                    />
                    {card.isDefault && (
                      <span className="default-badge">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Default
                      </span>
                    )}
                  </div>

                  <div className="card-details">
                    <div className="card-number">
                      •••• •••• •••• {card.last4}
                    </div>
                    <div className="card-expiry">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      Expires {card.expiry}
                    </div>
                    <div className="card-holder">
                      {card.holderName}
                    </div>
                  </div>

                  <div className="card-actions">
                    {!card.isDefault && (
                      <button
                        className={`set-default-btn ${clickedAction.id === card.id && clickedAction.action === 'default' ? 'clicked' : ''}`}
                        onClick={() => handleSetDefault(card.id)}
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      className={`edit-card-btn ${clickedAction.id === card.id && clickedAction.action === 'edit' ? 'clicked' : ''}`}
                      onClick={() => {
                        setClickedAction({ id: card.id, action: 'edit' });
                        setTimeout(() => setClickedAction({ id: null, action: null }), 1000);
                        setNotification({ show: true, message: 'Edit card feature coming soon!', type: 'info' });
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className={`delete-card-btn ${clickedAction.id === card.id && clickedAction.action === 'delete' ? 'clicked' : ''}`}
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Payment Methods */}
            <div className="other-payment-methods">
              <h3>Other Payment Options</h3>
              <div className="payment-options-grid">
                <div className="payment-option">
                  <FontAwesomeIcon icon={faMoneyBill} />
                  <span>Cash</span>
                </div>
                <div className="payment-option">
                  <FontAwesomeIcon icon={faMobile} />
                  <span>Mobile Money</span>
                </div>
                <div className="payment-option">
                  <FontAwesomeIcon icon={faCcPaypal} />
                  <span>PayPal</span>
                </div>
                <div className="payment-option">
                  <FontAwesomeIcon icon={faApplePay} />
                  <span>Apple Pay</span>
                </div>
                <div className="payment-option">
                  <FontAwesomeIcon icon={faGooglePay} />
                  <span>Google Pay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="recent-transactions">
            <h2>Recent Transactions</h2>
            <div className="transactions-list">
              <div className="transaction-item">
                <div className="transaction-icon">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <div className="transaction-details">
                  <div className="transaction-description">
                    Flight Booking - Emirates
                  </div>
                  <div className="transaction-date">
                    Feb 15, 2024
                  </div>
                </div>
                <div className="transaction-amount">$650.00</div>
              </div>

              <div className="transaction-item">
                <div className="transaction-icon">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <div className="transaction-details">
                  <div className="transaction-description">
                    Flight Booking - Air Tanzania
                  </div>
                  <div className="transaction-date">
                    Feb 10, 2024
                  </div>
                </div>
                <div className="transaction-amount">$450.00</div>
              </div>

              <div className="transaction-item">
                <div className="transaction-icon">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <div className="transaction-details">
                  <div className="transaction-description">
                    Hotel Booking - Dar es Salaam
                  </div>
                  <div className="transaction-date">
                    Feb 5, 2024
                  </div>
                </div>
                <div className="transaction-amount">$320.00</div>
              </div>
            </div>
            <button className="view-all-btn">View All Transactions</button>
          </div>
        </div>

        {/* Add Card Modal */}
        {showAddCard && (
          <div className="modal-overlay">
            <div className="modal-content payment-modal">
              <h2>Add New Payment Method</h2>

              <div className="payment-type-selector">
                <button
                  className={selectedMethod === 'card' ? 'active' : ''}
                  onClick={() => setSelectedMethod('card')}
                >
                  <FontAwesomeIcon icon={faCreditCard} />
                  Credit/Debit Card
                </button>
                <button
                  className={selectedMethod === 'mobile' ? 'active' : ''}
                  onClick={() => setSelectedMethod('mobile')}
                >
                  <FontAwesomeIcon icon={faMobile} />
                  Mobile Money
                </button>
                <button
                  className={selectedMethod === 'paypal' ? 'active' : ''}
                  onClick={() => setSelectedMethod('paypal')}
                >
                  <FontAwesomeIcon icon={faCcPaypal} />
                  PayPal
                </button>
              </div>

              {selectedMethod === 'card' && (
                <form onSubmit={handleAddCard} className="add-card-form">
                  <div className="form-group">
                    <label>Card Number</label>
                    <div className="card-input-wrapper">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={newCard.cardNumber}
                        onChange={(e) => setNewCard({
                          ...newCard,
                          cardNumber: formatCardNumber(e.target.value)
                        })}
                        maxLength="19"
                        required
                      />
                      <FontAwesomeIcon icon={faCreditCard} className="input-icon" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="As shown on card"
                      value={newCard.holderName}
                      onChange={(e) => setNewCard({
                        ...newCard,
                        holderName: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={newCard.expiry}
                        onChange={(e) => setNewCard({
                          ...newCard,
                          expiry: e.target.value
                        })}
                        maxLength="5"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>CVV</label>
                      <div className="cvv-input-wrapper">
                        <input
                          type="password"
                          placeholder="123"
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({
                            ...newCard,
                            cvv: e.target.value
                          })}
                          maxLength="4"
                          required
                        />
                        <FontAwesomeIcon icon={faLock} className="cvv-icon" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={newCard.setAsDefault}
                        onChange={(e) => setNewCard({
                          ...newCard,
                          setAsDefault: e.target.checked
                        })}
                      />
                      Set as default payment method
                    </label>
                  </div>

                  <div className="security-note">
                    <FontAwesomeIcon icon={faLock} />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowAddCard(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="save-btn">
                      Add Card
                    </button>
                  </div>
                </form>
              )}

              {selectedMethod === 'mobile' && (
                <div className="mobile-money-form">
                  <p>Enter your mobile money details</p>
                  <div className="form-group">
                    <label>Mobile Money Provider</label>
                    <select>
                      <option>M-Pesa</option>
                      <option>Tigo Pesa</option>
                      <option>Airtel Money</option>
                      <option>Halopesa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+255 XXX XXX XXX" />
                  </div>
                  <div className="modal-actions">
                    <button className="cancel-btn" onClick={() => setShowAddCard(false)}>Cancel</button>
                    <button className="save-btn">Add Mobile Money</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Undo Toast */}
        {toast.show && (
          <div className="action-toast">
            <span>{toast.message}</span>
            <button className="undo-btn" onClick={handleUndo}>
              Undo
            </button>
          </div>
        )}
      </div>
    </>
  );
}
