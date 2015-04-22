echo "PS1='\[\e[0;31m\]\u\[\e[m\] \[\e[1;34m\]\w\[\e[m\] \[\e[0;31m\]\$ \[\e[m\]\[\e[0;32m\]'" | tee -a /home/vagrant/.bashrc

echo 'set number' | tee -a /home/vagrant/.vimrc
echo 'colorscheme delek' | tee -a /home/vagrant/.vimrc

git config --global user.name "sdiemert"
git config --global user.email "simon.diemert@gmail.com"
