import requestIp from 'request-ip';

export const getClientIP = (req) => {
  console.log('=== IP Detection Debug ===');
  console.log('Headers:', req.headers);
  console.log('Connection:', req.connection?.remoteAddress);
  console.log('Socket:', req.socket?.remoteAddress);
  console.log('req.ip:', req.ip);
  
  // Get client IP with better detection
  let clientIp = requestIp.getClientIp(req);
  console.log('requestIp result:', clientIp);
  
  // Handle localhost cases first
  if (clientIp === '::1' || clientIp === '127.0.0.1') {
    clientIp = 'Local Development';
  } else if (!clientIp) {
    // Fallback IP detection if requestIp fails
    clientIp = req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               req.headers['x-client-ip'] || 
               req.connection?.remoteAddress || 
               req.socket?.remoteAddress || 
               req.ip || 
               'Unknown IP';
    
    console.log('Fallback IP result:', clientIp);
    
    // Clean up the IP address (remove port if present)
    if (clientIp && clientIp.includes(':')) {
      clientIp = clientIp.split(':')[0];
    }
    
    // If still localhost, try to get real IP
    if (clientIp === '::1' || clientIp === '127.0.0.1') {
      clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'Local Development';
    }
  }
  
  // Ensure we always return a non-empty string
  if (!clientIp || clientIp.trim() === '') {
    clientIp = 'Unknown IP';
  }
  
  console.log('Final IP result:', clientIp);
  console.log('=== End IP Detection Debug ===');
  
  return clientIp;
}; 