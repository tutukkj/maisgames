# Mais Games

Site estatico pronto para ser servido por Nginx. Nao ha build nem dependencias para instalar.

## Publicacao em VPS

1. Instale o Nginx na VPS:

```bash
sudo apt update
sudo apt install -y nginx
```

2. Envie o conteudo deste diretorio para a VPS:

```bash
sudo mkdir -p /var/www/maisgames
sudo rsync -av --delete ./ /var/www/maisgames/
```

3. Edite `deploy/nginx.conf` e troque `seu-dominio.com` pelo dominio real. O caminho esperado e `/var/www/maisgames`.

4. Ative o site:

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/maisgames
sudo ln -sfn /etc/nginx/sites-available/maisgames /etc/nginx/sites-enabled/maisgames
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

5. Aponte os registros DNS `A` do dominio para o IP da VPS. Depois, habilite HTTPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

## Arquivos

- `index.html`: pagina principal
- `styles.css`: estilos responsivos
- `app.js`: filtros, busca e modal de produtos
- `images-removebg-preview.png`: imagem local do hero
- `deploy/nginx.conf`: configuracao de servidor
- `robots.txt`: regras basicas para buscadores

Os cards de produtos usam fotos externas do Unsplash. A VPS precisa permitir conexoes de saida HTTPS para `images.unsplash.com`.
