export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
  megaMenu?: MegaMenuGroup[];
  featured?: { label: string; href: string; image?: string };
}

export interface MegaMenuGroup {
  title: string;
  items: { label: string; href: string }[];
}

export const menuData: MenuItem[] = [
  {
    label: "Desktop",
    href: "/category/desktop",
    children: [
      { label: "All Desktop", href: "/category/desktop" },
      { label: "Gaming PC", href: "/category/desktop/gaming-pc" },
      { label: "Business PC", href: "/category/desktop/business-pc" },
      { label: "Brand PC", href: "/category/desktop/brand-pc" },
      { label: "All-in-One PC", href: "/category/desktop/all-in-one" },
      { label: "Mini PC", href: "/category/desktop/mini-pc" },
    ],
  },
  {
    label: "Laptop",
    href: "/category/laptop",
    megaMenu: [
      {
        title: "Laptop Type",
        items: [
          { label: "All Laptop", href: "/category/laptop" },
          { label: "Gaming Laptop", href: "/category/laptop/gaming" },
          { label: "Business Laptop", href: "/category/laptop/business" },
          { label: "Ultrabook", href: "/category/laptop/ultrabook" },
          { label: "MacBook", href: "/category/laptop/macbook" },
          { label: "Laptop Bag", href: "/category/laptop/bag" },
          { label: "Laptop Accessories", href: "/category/laptop/accessories" },
        ],
      },
      {
        title: "Popular Brands",
        items: [
          { label: "Lenovo", href: "/category/laptop/lenovo" },
          { label: "ASUS", href: "/category/laptop/asus" },
          { label: "HP", href: "/category/laptop/hp" },
          { label: "Acer", href: "/category/laptop/acer" },
          { label: "MSI", href: "/category/laptop/msi" },
          { label: "Dell", href: "/category/laptop/dell" },
          { label: "Apple", href: "/category/laptop/apple" },
        ],
      },
      {
        title: "Processor",
        items: [
          { label: "Intel Core i3", href: "/category/laptop/intel-i3" },
          { label: "Intel Core i5", href: "/category/laptop/intel-i5" },
          { label: "Intel Core i7", href: "/category/laptop/intel-i7" },
          { label: "Intel Core i9", href: "/category/laptop/intel-i9" },
          { label: "AMD Ryzen 5", href: "/category/laptop/amd-ryzen-5" },
          { label: "AMD Ryzen 7", href: "/category/laptop/amd-ryzen-7" },
        ],
      },
    ],
  },
  {
    label: "Component",
    href: "/category/component",
    megaMenu: [
      {
        title: "Core Components",
        items: [
          { label: "Processor", href: "/category/component/processor" },
          { label: "CPU Cooler", href: "/category/component/cpu-cooler" },
          { label: "Motherboard", href: "/category/component/motherboard" },
          { label: "RAM (Desktop)", href: "/category/component/ram-desktop" },
          { label: "RAM (Laptop)", href: "/category/component/ram-laptop" },
          { label: "Graphics Card", href: "/category/component/graphics-card" },
        ],
      },
      {
        title: "Storage & Power",
        items: [
          { label: "SSD", href: "/category/component/ssd" },
          { label: "Hard Disk", href: "/category/component/hard-disk" },
          { label: "Power Supply", href: "/category/component/power-supply" },
          { label: "Casing", href: "/category/component/casing" },
          { label: "Casing Cooler", href: "/category/component/casing-cooler" },
        ],
      },
      {
        title: "Brands",
        items: [
          { label: "Intel", href: "/category/component/intel" },
          { label: "AMD", href: "/category/component/amd" },
          { label: "ASUS", href: "/category/component/asus" },
          { label: "MSI", href: "/category/component/msi" },
          { label: "Gigabyte", href: "/category/component/gigabyte" },
          { label: "Corsair", href: "/category/component/corsair" },
        ],
      },
    ],
  },
  {
    label: "Monitor",
    href: "/category/monitor",
    megaMenu: [
      {
        title: "Monitor Type",
        items: [
          { label: "All Monitor", href: "/category/monitor" },
          { label: "Gaming Monitor", href: "/category/monitor/gaming" },
          { label: "Professional Monitor", href: "/category/monitor/professional" },
          { label: "Curved Monitor", href: "/category/monitor/curved" },
          { label: "Portable Monitor", href: "/category/monitor/portable" },
        ],
      },
      {
        title: "Brands",
        items: [
          { label: "ASUS", href: "/category/monitor/asus" },
          { label: "MSI", href: "/category/monitor/msi" },
          { label: "LG", href: "/category/monitor/lg" },
          { label: "Samsung", href: "/category/monitor/samsung" },
          { label: "Dell", href: "/category/monitor/dell" },
          { label: "Acer", href: "/category/monitor/acer" },
        ],
      },
    ],
  },
  {
    label: "Power",
    href: "/category/power",
    children: [
      { label: "All Power", href: "/category/power" },
      { label: "UPS", href: "/category/power/ups" },
      { label: "Power Strip", href: "/category/power/power-strip" },
      { label: "Surge Protector", href: "/category/power/surge-protector" },
      { label: "AVR", href: "/category/power/avr" },
    ],
  },
  {
    label: "Phone",
    href: "/category/phone",
    children: [
      { label: "All Phone", href: "/category/phone" },
      { label: "Smartphone", href: "/category/phone/smartphone" },
      { label: "Feature Phone", href: "/category/phone/feature-phone" },
      { label: "Phone Accessories", href: "/category/phone/accessories" },
      { label: "Charger", href: "/category/phone/charger" },
      { label: "Power Bank", href: "/category/phone/power-bank" },
    ],
  },
  {
    label: "Tablet",
    href: "/category/tablet",
    children: [
      { label: "All Tablet", href: "/category/tablet" },
      { label: "Android Tablet", href: "/category/tablet/android" },
      { label: "iPad", href: "/category/tablet/ipad" },
      { label: "Windows Tablet", href: "/category/tablet/windows" },
      { label: "Tablet Accessories", href: "/category/tablet/accessories" },
    ],
  },
  {
    label: "Office Equipment",
    href: "/category/office",
    children: [
      { label: "All Office Equipment", href: "/category/office" },
      { label: "Printer", href: "/category/office/printer" },
      { label: "Scanner", href: "/category/office/scanner" },
      { label: "Projector", href: "/category/office/projector" },
      { label: "Ink & Toner", href: "/category/office/ink-toner" },
      { label: "Paper Shredder", href: "/category/office/paper-shredder" },
    ],
  },
  {
    label: "Camera",
    href: "/category/camera",
    children: [
      { label: "All Camera", href: "/category/camera" },
      { label: "DSLR", href: "/category/camera/dslr" },
      { label: "Mirrorless", href: "/category/camera/mirrorless" },
      { label: "Action Camera", href: "/category/camera/action" },
      { label: "Webcam", href: "/category/camera/webcam" },
      { label: "Camera Accessories", href: "/category/camera/accessories" },
    ],
  },
  {
    label: "Security",
    href: "/category/security",
    children: [
      { label: "All Security", href: "/category/security" },
      { label: "CCTV Camera", href: "/category/security/cctv" },
      { label: "DVR/NVR", href: "/category/security/dvr-nvr" },
      { label: "Biometric", href: "/category/security/biometric" },
      { label: "Access Control", href: "/category/security/access-control" },
    ],
  },
  {
    label: "Networking",
    href: "/category/networking",
    children: [
      { label: "All Networking", href: "/category/networking" },
      { label: "Router", href: "/category/networking/router" },
      { label: "Switch", href: "/category/networking/switch" },
      { label: "Access Point", href: "/category/networking/access-point" },
      { label: "Network Cable", href: "/category/networking/cable" },
      { label: "Network Adapter", href: "/category/networking/adapter" },
    ],
  },
  {
    label: "Software",
    href: "/category/software",
    children: [
      { label: "All Software", href: "/category/software" },
      { label: "Operating System", href: "/category/software/os" },
      { label: "Antivirus", href: "/category/software/antivirus" },
      { label: "Office Suite", href: "/category/software/office" },
    ],
  },
  {
    label: "Server & Storage",
    href: "/category/server",
    children: [
      { label: "All Server", href: "/category/server" },
      { label: "Server", href: "/category/server/server" },
      { label: "NAS Storage", href: "/category/server/nas" },
      { label: "HDD", href: "/category/server/hdd" },
      { label: "Tape Drive", href: "/category/server/tape-drive" },
    ],
  },
  {
    label: "Accessories",
    href: "/category/accessories",
    megaMenu: [
      {
        title: "Input Devices",
        items: [
          { label: "Keyboard", href: "/category/accessories/keyboard" },
          { label: "Mouse", href: "/category/accessories/mouse" },
          { label: "Mouse Pad", href: "/category/accessories/mouse-pad" },
          { label: "Keyboard & Mouse Combo", href: "/category/accessories/combo" },
        ],
      },
      {
        title: "Audio",
        items: [
          { label: "Headphone", href: "/category/accessories/headphone" },
          { label: "Speaker", href: "/category/accessories/speaker" },
          { label: "Microphone", href: "/category/accessories/microphone" },
          { label: "Sound Card", href: "/category/accessories/sound-card" },
        ],
      },
      {
        title: "Storage & cables",
        items: [
          { label: "USB Flash Drive", href: "/category/accessories/flash-drive" },
          { label: "Card Reader", href: "/category/accessories/card-reader" },
          { label: "HDMI Cable", href: "/category/accessories/hdmi-cable" },
          { label: "USB Hub", href: "/category/accessories/usb-hub" },
        ],
      },
    ],
  },
  {
    label: "Gadget",
    href: "/category/gadget",
    children: [
      { label: "All Gadget", href: "/category/gadget" },
      { label: "Smart Watch", href: "/category/gadget/smart-watch" },
      { label: "Smart Band", href: "/category/gadget/smart-band" },
      { label: "Earbuds", href: "/category/gadget/earbuds" },
      { label: "Drone", href: "/category/gadget/drone" },
    ],
  },
  {
    label: "Gaming",
    href: "/category/gaming",
    children: [
      { label: "All Gaming", href: "/category/gaming" },
      { label: "Gaming Console", href: "/category/gaming/console" },
      { label: "Gaming Chair", href: "/category/gaming/chair" },
      { label: "Gaming Desk", href: "/category/gaming/desk" },
      { label: "Gaming Headset", href: "/category/gaming/headset" },
      { label: "Gamepad", href: "/category/gaming/gamepad" },
    ],
  },
  {
    label: "TV",
    href: "/category/tv",
    children: [
      { label: "All TV", href: "/category/tv" },
      { label: "Smart TV", href: "/category/tv/smart" },
      { label: "Android TV", href: "/category/tv/android" },
      { label: "LED TV", href: "/category/tv/led" },
      { label: "TV Accessories", href: "/category/tv/accessories" },
    ],
  },
  {
    label: "Appliance",
    href: "/category/appliance",
    children: [
      { label: "All Appliance", href: "/category/appliance" },
      { label: "Air Conditioner", href: "/category/appliance/ac" },
      { label: "Refrigerator", href: "/category/appliance/refrigerator" },
      { label: "Washing Machine", href: "/category/appliance/washing-machine" },
      { label: "Fan", href: "/category/appliance/fan" },
    ],
  },
];
