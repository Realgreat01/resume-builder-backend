import bcrypt from 'bcrypt';

const comparePass = async () => {
  return await bcrypt.compare(
    'Real4great',
    '$2b$10$WZ1cZbbDAQVthAOc0RRGwepS0aQ6PEWvrniJVpPsz/wYeB7fb.mWe'
  );
};
comparePass().then(pas => console.log(pas));
