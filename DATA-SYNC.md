# Data Sync Workflow

## Quick Reference

### 📥 Pull Latest Data from VPS

```bash
git pull origin main
```

Your local `/data` folder will now have the latest orders, users, and products from the VPS!

### 📤 Push Local Changes to VPS

```bash
git add data/
git commit -m "Updated data"
git push origin main
```

Then on VPS:
```bash
cd /var/www/blisshairstudio
git pull origin main
sudo systemctl restart bliss-api
```

### 🔄 Typical Workflow

**Scenario 1: Customer places order on VPS**
1. Order saved to `/var/www/blisshairstudio/data/orders.json`
2. On VPS: `git add data/ && git commit -m "New order" && git push`
3. On local: `git pull origin main`
4. You now see the order locally!

**Scenario 2: You add product locally**
1. Product saved to `./data/products.json`
2. On local: `git add data/ && git commit -m "New product" && git push`
3. On VPS: `git pull origin main && sudo systemctl restart bliss-api`
4. Product now appears on live site!

### 🎯 Best Practices

1. **Before starting work**: Always pull first
   ```bash
   git pull origin main
   ```

2. **After making changes**: Commit and push data
   ```bash
   git add data/
   git commit -m "Describe what changed"
   git push origin main
   ```

3. **On VPS after pulling**: Restart API to pick up changes
   ```bash
   sudo systemctl restart bliss-api
   ```

### 🚨 Merge Conflicts?

If two people edit data at the same time:

```bash
# Pull to see conflict
git pull origin main

# View conflicting file
cat data/products.json

# Resolve manually or:
git checkout --ours data/products.json   # Keep your version
# OR
git checkout --theirs data/products.json # Keep their version

# Then commit
git add data/
git commit -m "Resolved conflict"
git push
```

### 📊 View Data Status

```bash
# See what's changed
git status

# See data file changes
git diff data/

# View commit history
git log --oneline data/
```

## That's it! 🎉

All your data (orders, users, products) syncs seamlessly between local and VPS through Git!
