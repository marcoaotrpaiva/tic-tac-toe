export default function Toast({ message }: { message: string }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '70%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#4caf50',
        padding: '12px 22px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 600,
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        animation: 'fadein 0.3s ease',
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}
