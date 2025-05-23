import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download } from 'lucide-react';
import Button from '../ui/Button';

interface QRCodeModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ url, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const svg = document.querySelector('#profile-qr-code svg') as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'profile-qr.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Profile QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div 
          id="profile-qr-code"
          className="bg-white p-4 rounded-lg flex justify-center mb-4"
        >
          <QRCodeSVG
            value={url}
            size={200}
            level="H"
            includeMargin
            imageSettings={{
              src: "/favicon.svg",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>

        <p className="text-sm text-gray-600 text-center mb-4">
          Scan this QR code to view the profile or share it with others.
        </p>

        <Button
          onClick={handleDownload}
          className="w-full"
          leftIcon={<Download size={18} />}
        >
          Download QR Code
        </Button>
      </div>
    </div>
  );
};

export default QRCodeModal;