import type { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: 'admin-001',
    name: 'Administrador',
    lastName: 'Sistema',
    medusaCode: 'ADMIN2024',
    email: 'admin@redinnovacionfp.es',
    phone: '922000000',
    center: 'Administración Central',
    network: 'RED-INNOVA-1',
    role: 'admin',
    imageUrl: 'https://ui-avatars.com/api/?name=Administrador+Sistema&background=0D47A1&color=fff',
  },
  {
    id: 'coord-001',
    name: 'María',
    lastName: 'González',
    medusaCode: 'COORD001',
    email: 'maria.gonzalez@redinnovacionfp.es',
    phone: '922111111',
    center: 'CIFP César Manrique',
    network: 'RED-INNOVA-1',
    role: 'general_coordinator',
    imageUrl: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=00796B&color=fff',
  },
  {
    id: 'subnet-001',
    name: 'Juan',
    lastName: 'Pérez',
    medusaCode: 'SUB001',
    email: 'juan.perez@redinnovacionfp.es',
    phone: '922222222',
    center: 'CIFP San Cristóbal',
    network: 'RED-INNOVA-1',
    role: 'subnet_coordinator',
    imageUrl: 'https://ui-avatars.com/api/?name=Juan+Perez&background=0277BD&color=fff',
  },
  {
    id: 'manager-001',
    name: 'Ana',
    lastName: 'Rodríguez',
    medusaCode: 'MAN001',
    email: 'ana.rodriguez@redinnovacionfp.es',
    phone: '922333333',
    center: 'CIFP César Manrique',
    network: 'RED-INNOVA-1',
    role: 'manager',
    imageUrl: 'https://ui-avatars.com/api/?name=Ana+Rodriguez&background=558B2F&color=fff',
  },
  {
    id: 'manager-002',
    name: 'Carlos',
    lastName: 'Martín',
    medusaCode: 'MAN002',
    email: 'carlos.martin@redinnovacionfp.es',
    phone: '922444444',
    center: 'CIFP San Cristóbal',
    network: 'RED-INNOVA-1',
    role: 'manager',
    imageUrl: 'https://ui-avatars.com/api/?name=Carlos+Martin&background=558B2F&color=fff',
  }
];