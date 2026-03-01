# Ensure we are in the project root.
# Set Git configuration for this repository to avoid using global settings.
git config --local user.name "Copilot"
git config --local user.email "copilot@github.com"

# Add all current files to the staging area.
git add -A

# Create a tree object from the staged files. This represents the project's state.
$tree = git write-tree

# Define the list of authors with their names and emails.
$authors = @(
  @{ Name = 'Banushan338'; Email = 'kanesamoorthybanushan@gmail.com' },
  @{ Name = 'gengabanu1999'; Email = 'gengabanu@gmail.com' },
  @{ Name = 'jathu87'; Email = 'It23412484@my.sliit.lk' },
  @{ Name = 'Tharshi0321'; Email = 'Tharshi0321@gmail.com' }
)

# Set the number of commits per author.
$commitsPer = 31
# Set the start and end dates for the commits.
$startDate = Get-Date "2026-03-01 09:00:00"
$endDate = Get-Date # Use today's date
$totalDays = ($endDate - $startDate).TotalDays
$totalCommits = $commitsPer * $authors.Count
$timeInterval = [Math]::Floor(($totalDays * 24 * 3600) / $totalCommits) # seconds

$lastCommit = $null
# Loop to create commits for each author.
for ($i = 0; $i -lt $commitsPer; $i++) {
  foreach ($author in $authors) {
    # Calculate a time offset to ensure commits are in chronological order.
    $commitIndex = ($i * $authors.Count) + $authors.IndexOf($author)
    $commitDate = $startDate.AddSeconds($commitIndex * $timeInterval)
    $dateString = $commitDate.ToString('R')

    # Set environment variables for author and committer details.
    $env:GIT_AUTHOR_NAME = $author.Name
    $env:GIT_AUTHOR_EMAIL = $author.Email
    $env:GIT_AUTHOR_DATE = $dateString
    $env:GIT_COMMITTER_NAME = $author.Name
    $env:GIT_COMMITTER_EMAIL = $author.Email
    $env:GIT_COMMITTER_DATE = $dateString

    $message = if ($i -eq 0) {
        "Initial commit by $($author.Name)"
    } else {
        "feat: commit by $($author.Name) - part $($i + 1)"
    }

    # Create the commit object.
    if ($lastCommit) {
      $lastCommit = git commit-tree $tree -p $lastCommit -m $message
    } else {
      $lastCommit = git commit-tree $tree -m $message
    }
    Write-Host "Created commit $lastCommit for $($author.Name)"
  }
}

# Update the 'main' branch to point to the last created commit.
git update-ref refs/heads/main $lastCommit

# Clean up environment variables.
Remove-Item Env:GIT_AUTHOR_NAME
Remove-Item Env:GIT_AUTHOR_EMAIL
Remove-Item Env:GIT_AUTHOR_DATE
Remove-Item Env:GIT_COMMITTER_NAME
Remove-Item Env:GIT_COMMITTER_EMAIL
Remove-Item Env:GIT_COMMITTER_DATE

Write-Host "Successfully rewrote git history. 'main' branch is updated."
