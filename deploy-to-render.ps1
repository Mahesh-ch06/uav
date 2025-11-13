# 🚀 Quick Deployment Script for Render

Write-Host "🚀 AI Traffic Management System - Render Deployment" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "❌ Git repository not found. Initializing..." -ForegroundColor Yellow
    git init
    git remote add origin https://github.com/aaron-seq/AI-ML-Based-traffic-management-system.git
}

# Stage all changes
Write-Host "📦 Staging changes..." -ForegroundColor Green
git add .

# Show status
Write-Host ""
Write-Host "📋 Changed files:" -ForegroundColor Yellow
git status --short

# Commit changes
Write-Host ""
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Configure for Render deployment with PyTorch 2.5.1"
}

Write-Host "💾 Committing changes..." -ForegroundColor Green
git commit -m "$commitMessage"

# Push to GitHub
Write-Host ""
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Green
Write-Host "Note: You may need to fork the repository first!" -ForegroundColor Yellow
Write-Host ""

$push = Read-Host "Do you want to push now? (y/n)"
if ($push -eq 'y' -or $push -eq 'Y') {
    git push origin main
    Write-Host ""
    Write-Host "✅ Changes pushed successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⏸️  Skipped push. Run 'git push origin main' when ready." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "📖 Next Steps:" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Fork this repository to your GitHub account" -ForegroundColor White
Write-Host "   → Go to: https://github.com/aaron-seq/AI-ML-Based-traffic-management-system" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Update your local git remote to your fork:" -ForegroundColor White
Write-Host "   git remote set-url origin https://github.com/YOUR-USERNAME/AI-ML-Based-traffic-management-system.git" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Push your changes:" -ForegroundColor White
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Connect to Render:" -ForegroundColor White
Write-Host "   → Go to: https://dashboard.render.com" -ForegroundColor Gray
Write-Host "   → Click 'New +' → 'Blueprint'" -ForegroundColor Gray
Write-Host "   → Connect your forked repository" -ForegroundColor Gray
Write-Host "   → Click 'Apply' to deploy!" -ForegroundColor Gray
Write-Host ""
Write-Host "5. After deployment, update frontend/.env.production with your Render URL" -ForegroundColor White
Write-Host ""
Write-Host "📚 Full guide: Read RENDER_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
